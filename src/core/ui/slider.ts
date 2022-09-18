import { IPointer } from './pointer';
import { convertRange, getBoolean, getNumber, isNumber, roundToStep, setDecimalPlaces } from '../domain/math-provider';
import { AttributesEnum } from '../enums/attributes-enum';
import { TData, TStep } from '../types';
import { findValueIndexInData, parseData } from '../dal/data-provider';
import { TypeEnum } from '../enums/type-enum';
import { IPanelFill, PanelFill } from './panel-fill';
import { sendChangeEvent, sendMouseDownEvent, sendMouseUpEvent } from '../domain/events-provider';
import { IStyles, Styles } from './styles';
import { CSSVariables } from '../enums/css-vars-enum';
import { CssClasses } from '../enums/css-classes-enum';
import { createPointer2, removeFocus } from '../domain/common-provider';
import { IPluginsManager, PluginsManager } from '../plugins/plugins-manager';

export interface ISlider {
  readonly pointer1: IPointer;
  readonly pointer2: IPointer | null;
  readonly styles: IStyles | null;
  readonly pluginsManager: IPluginsManager | null;

  pointersOverlap: boolean;
  pointersMinDistance: number;
  pointersMaxDistance: number;
  rangeDragging: boolean;

  readonly min: number | string;
  readonly max: number | string;
  readonly step: TStep;
  readonly data: TData;

  type: TypeEnum;
  rightToLeft: boolean;
  bottomToTop: boolean;
  disabled: boolean;
  keyboardDisabled: boolean;
  round: number;
  animateOnClick: string | undefined;
  ariaLabel1: string | undefined;
  ariaLabel2: string | undefined;

  setMin: (value: number | string | undefined | null) => void;
  setMax: (value: number | string | undefined | null) => void;
  setValue: (value: number | string | undefined | null, index: number) => void;
  setStep: (value: TStep) => void;
  setData: (value: TData | string | null | number) => void;
  getTextValue: (_percent: number | undefined) => undefined | string | number;

  destroy: () => void;
}

export const MIN_DEFAULT = 0;
export const MAX_DEFAULT = 100;
export const ROUND_DEFAULT = 2;

export const Slider = ($component: HTMLElement, $slider: HTMLElement, pointer1: IPointer, pointer2: IPointer | null) : ISlider => {

  let selectedPointer: IPointer | null = null;
  let panelFill: IPanelFill | null = null;
  let styles: IStyles | null = null;
  let pluginsManager: IPluginsManager | null = null;

  let min = MIN_DEFAULT;
  let max = MAX_DEFAULT;
  let step: TStep = undefined;
  let data: TData = undefined;
  let type: TypeEnum = TypeEnum.Horizontal;
  let round: number = ROUND_DEFAULT;
  let rightToLeft = false;
  let bottomToTop = false;

  let pointersOverlap = false;
  let pointersMinDistance = 0;
  let pointersMaxDistance = Infinity;

  let rangeDragging = false;

  let rangeDraggingStart: number | undefined = undefined;
  let rangeDraggingDiff: number | undefined = undefined;

  let disabled = false;
  let keyboardDisabled = false;
  let animateOnClick: string | undefined = undefined;

  let ariaLabel1: string | undefined = undefined;
  let ariaLabel2: string | undefined = undefined;

  // -------------- EVENTS --------------------

  const onMouseDown = (evt: MouseEvent) => {
    if(disabled) return;

    if (evt.preventDefault) {
      evt.preventDefault();
    }

    onValueChange(evt);

    window.addEventListener('mousemove', onValueChange);
    window.addEventListener('mouseup', onMouseUp);

    sendMouseDownEvent($component, evt);
  };

  const onMouseUp = (evt: MouseEvent) => {
    if(disabled) return;

    rangeDraggingStart = undefined;
    rangeDraggingDiff = undefined;

    window.removeEventListener('mousemove', onValueChange);
    window.removeEventListener('mouseup', onValueChange);

    if(animateOnClick){
      $slider.classList.add(CssClasses.AnimateOnClick);
    }

    sendMouseUpEvent($component, evt);
  };

  const getActivePointer = ($target: HTMLElement, percent: number) => {
    // if only 1 pointer exists --> return it
    if(!pointer2){
      if(pointer1.isClicked($target) && animateOnClick){
        $slider.classList.remove(CssClasses.AnimateOnClick);
      }

      return pointer1;
    }

    const panelFillClicked = isPanelFillClicked($target);

    if(rangeDragging){
      let _dragPercent = percent;
      const _step = getRelativeStep(_dragPercent);
      if(_step !== undefined){
        _dragPercent = roundToStep(_dragPercent, _step);
      }

      if(panelFillClicked){
        rangeDraggingStart = _dragPercent;
        rangeDraggingDiff = 0;
      }
      else{
        if(rangeDraggingStart !== undefined){
          rangeDraggingDiff = _dragPercent - rangeDraggingStart;
          rangeDraggingStart = _dragPercent;
        }
      }
    }

    if(!isPanelClicked($target) && !panelFillClicked){
      // if clicked directly on 1 of the pointers ---> return it
      if(pointer1.isClicked($target)){

        if(animateOnClick){
          $slider.classList.remove(CssClasses.AnimateOnClick);
        }

        return pointer1;
      }

      const isPointer2Clicked = pointer2?.isClicked($target) ?? false;
      if(isPointer2Clicked){

        if(animateOnClick){
          $slider.classList.remove(CssClasses.AnimateOnClick);
        }

        return pointer2;
      }

      // if already selected pointer ---> return it
      if(selectedPointer === pointer1) return pointer1;
      if(selectedPointer === pointer2) return pointer2;
    }

    // find the closest pointer and return it
    const distance1 = Math.abs(percent - pointer1.percent);
    const distance2 = Math.abs(percent - pointer2.percent);
    return distance1 <= distance2 ? pointer1 : pointer2;
  };

  const onValueChange = (evt: MouseEvent | TouchEvent) => {

    // find the percent [0, 100] of the current mouse position in vertical or horizontal slider
    let percent;

    if(type === TypeEnum.Vertical){
      const { height: boxHeight, top: boxTop } = $slider.getBoundingClientRect();
      const mouseY = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientY : (evt as TouchEvent).touches[0].clientY;
      const top = Math.min(Math.max(0, mouseY - boxTop), boxHeight);
      percent = (top * 100) / boxHeight;
    }
    else{
      const { width: boxWidth, left: boxLeft } = $slider.getBoundingClientRect();
      const mouseX = evt.type.indexOf('mouse') !== -1 ? (evt as MouseEvent).clientX : (evt as TouchEvent).touches[0].clientX;
      const left = Math.min(Math.max(0, mouseX - boxLeft), boxWidth);
      percent = (left * 100) / boxWidth;
    }

    if(rightToLeft || bottomToTop){
      percent = 100 - percent;
    }

    selectedPointer = getActivePointer(evt.target as HTMLElement, percent);

    // handle range dragging
    if(rangeDragging && pointer2 && rangeDraggingDiff !== undefined){

      const pointer1SmallerThanMin = pointer1.percent + rangeDraggingDiff < 0;
      const pointer2GreaterThanMax = pointer2.percent + rangeDraggingDiff > 100;
      if(pointer1SmallerThanMin || pointer2GreaterThanMax) return;

      setPositions(1, pointer1.percent + rangeDraggingDiff);
      setPositions(2, pointer2.percent + rangeDraggingDiff);
      return;
    }

    if(selectedPointer === pointer1 && !pointer1.disabled){
      // update the pointer percent, focus, and update its position
      setPositions(1, percent);
    }

    if(selectedPointer === pointer2 && !pointer2?.disabled){
      // update the pointer percent, focus, and update its position
      setPositions(2, percent);
    }
  };

  const pointerMouseWheel = (evt: WheelEvent) => {
    if (disabled || document.activeElement !== $component) return;

    if((selectedPointer === pointer1 && pointer1.disabled) ||
       (selectedPointer === pointer2 && pointer2?.disabled)) return;

    evt.stopPropagation();
    evt.preventDefault();

    const scrollTop = evt.deltaY < 0;
    const rightOrBottom = rightToLeft || bottomToTop;
    const shouldGoPrev = scrollTop ? !rightOrBottom : rightOrBottom;

    if(shouldGoPrev){
      if(selectedPointer === pointer1){
        goPrev(1, pointer1.percent);
      }

      if(selectedPointer === pointer2){
        goPrev(2, pointer2?.percent);
      }
    }
    else{
      if(selectedPointer === pointer1){
        goNext(1, pointer1.percent);
      }

      if(selectedPointer === pointer2){
        goNext(2, pointer2?.percent);
      }
    }
  };

  // -------------- Arrows --------------------

  const arrowLeft = (pointerIndex: number) => {
    if(disabled || keyboardDisabled) return;

    if(type === TypeEnum.Vertical){
      if(bottomToTop){
        // jump to the max value
        setPositions(pointerIndex, 100);
      }
      else{
        // jump to the min value
        setPositions(pointerIndex, 0);
      }
    }
    else{
      if(rightToLeft){
        // go forward
        if(pointerIndex < 2){
          goNext(1, pointer1.percent);
        }
        else{
          goNext(2, pointer2?.percent);
        }
      }
      else{
        // go backwards
        if(pointerIndex < 2){
          goPrev(1, pointer1.percent);
        }
        else{
          goPrev(2, pointer2?.percent);
        }
      }
    }
  };

  const arrowRight = (pointerIndex: number) => {
    if(disabled || keyboardDisabled) return;

    if(type === TypeEnum.Vertical){
      if(bottomToTop){
        // jump to the min value
        setPositions(pointerIndex, 0);
      }
      else{
        // jump to the max value
        setPositions(pointerIndex, 100);
      }
    }
    else{
      if(rightToLeft){
        // go backward
        if(pointerIndex < 2){
          goPrev(1, pointer1.percent);
        }
        else{
          goPrev(2, pointer2?.percent);
        }
      }
      else{
        // go forward
        if(pointerIndex < 2){
          goNext(1, pointer1.percent);
        }
        else{
          goNext(2, pointer2?.percent);
        }
      }
    }
  };

  const arrowUp = (pointerIndex: number) => {
    if(disabled || keyboardDisabled) return;

    if(type === TypeEnum.Vertical){
      if(bottomToTop){
        // go forwards
        if(pointerIndex < 2){
          goNext(1, pointer1.percent);
        }
        else{
          goNext(2, pointer2?.percent);
        }
      }
      else{
        // go backwards
        if(pointerIndex < 2){
          goPrev(1, pointer1.percent);
        }
        else{
          goPrev(2, pointer2?.percent);
        }
      }
    }
    else{
      if(rightToLeft){
        // jump to the max value
        setPositions(pointerIndex, 100);
      }
      else{
        // jump to the min value
        setPositions(pointerIndex, 0);
      }
    }
  };

  const arrowDown = (pointerIndex: number) => {
    if(disabled || keyboardDisabled) return;

    if(type === TypeEnum.Vertical){
      if(bottomToTop){
        // go backward
        if(pointerIndex < 2){
          goPrev(1, pointer1.percent);
        }
        else{
          goPrev(2, pointer2?.percent);
        }
      }
      else{
        // go forward
        if(pointerIndex < 2){
          goNext(1, pointer1.percent);
        }
        else{
          goNext(2, pointer2?.percent);
        }
      }
    }
    else{
      if(rightToLeft){
        // jump to the min value
        setPositions(pointerIndex, 0);
      }
      else{
        // jump to the max value
        setPositions(pointerIndex, 100);
      }
    }
  };

  // -------------- Helpers ------------------------

  const isPanelClicked = ($target: HTMLElement) => {
    return $target.classList.contains('panel');
  };

  const isPanelFillClicked = ($target: HTMLElement) => {
    return $target.classList.contains('panel-fill');
  };

  const goPrev = (index: number, _percent: number | undefined) => {
    if(_percent === undefined) return;

    let step = getRelativeStep(_percent);
    if(step == undefined){
      step = 1;
    }

    _percent -= step;

    if(_percent < 0){
      _percent = 0;
    }

    setPositions(index, _percent);
  };

  const goNext = (index: number, _percent: number | undefined) => {
    if(_percent === undefined) return;

    let step = getRelativeStep(_percent);
    if(step == undefined){
      step = 1;
    }

    _percent += step;

    if(_percent > 100){
      _percent = 100;
    }

    setPositions(index, _percent);
  };

  const addSecondPointer = () => {
    pointer2 = createPointer2($component, pointer1.$pointer);
    pointer2?.setCallbacks(arrowLeft, arrowRight, arrowUp, arrowDown);
    pointer2.disabled = getBoolean($component.getAttribute(AttributesEnum.Pointer2Disabled));

    const ariaLabel2 = $component.getAttribute(AttributesEnum.AriaLabel2);
    if(ariaLabel2){
      setAriaLabel(ariaLabel2, 2);
    }

    updatePlugins();
  };

  const removeSecondPointer = () => {
    pointer2?.destroy();
    pointer2 = null;

    updatePlugins();
  };

  const updatePlugins = () => {

    if(!pluginsManager) return;
    pluginsManager.update(
      pointer1.percent,
      pointer2?.percent,
      getTextValue(pointer1.percent),
      getTextValue(pointer2?.percent),
      min,
      max,
      getTextMinMax(min),
      getTextMinMax(max),
      rightToLeft,
      bottomToTop
    );
  };

  const requestUpdatePlugins = () => {
    updatePlugins();
  };

  const updatePointersFromPlugins = (value1: string | number | undefined, value2: string | number | undefined) => {
    const val1 = (value1 === null || value1 === undefined) ? null : value1.toString();
    const val2 = (value2 === null || value2 === undefined) ? null : value2.toString();
    setInitialPointersValues(val1, val1, val2);
  };

  // -------------- Getters --------------------

  const getPointer1LeftWall = () => {
    if(pointersOverlap || !pointer2 || max === min) return undefined;
    const converted = pointersMaxDistance * 100 / (max - min);
    return Math.max(0, pointer2.percent - converted);
  };

  const getPointer1RightWall = () => {
    if(pointersOverlap || !pointer2 || max === min) return undefined;
    const converted = 100 * pointersMinDistance / (max - min);
    return Math.max(0, pointer2.percent - converted);
  };

  const getPointer2LeftWall = () => {
    if(pointersOverlap || max === min) return undefined;
    const converted = pointersMinDistance * 100 / (max - min);
    return Math.min(pointer1.percent + converted, 100);
  };

  const getPointer2RightWall = () => {
    if(pointersOverlap || max === min) return undefined;
    const converted = pointersMaxDistance * 100 / (max - min);
    return Math.min(pointer1.percent + converted, 100);
  };

  const getRelativeStep = (_percent: number) => {

    // round percent to step
    let _step = typeof step === 'function' ? step(convertRange(0, 100, min, max, _percent), _percent) : step;
    if(_step !== undefined){
      _step = convertRange(min, max, 0, 100, _step as number);
      return _step;
    }

    return undefined;
  };

  const getTextValue = (_percent: number | undefined) => {
    if(_percent === undefined) return undefined;

    const val = convertRange(0, 100, min, max, _percent);

    if(data !== undefined){
      return data[val];
    }

    return setDecimalPlaces(val, round);
  };

  const getMin = () => {

    if(data !== undefined){
      return data[min];
    }

    return min;
  };

  const getMax = () => {

    if(data !== undefined){
      return data[max];
    }

    return max;
  };

  const getTextMinMax = (minOrMax: number) => {
    if(data !== undefined) return data[minOrMax];
    return minOrMax;
  };

  const getPointerMin = (index: number) => {
    if(index < 2 || pointersOverlap) return getMin();
    return getTextValue(pointer1.percent) ?? '';
  };

  const getPointerMax = (index: number) => {
    if(index >= 2 || pointersOverlap) return getMax();

    if(pointer2){
      return getTextValue(pointer2?.percent) ?? '';
    }
    else{
      return getMax();
    }
  };

  // -------------- Setters --------------------

  const setPositions = (index: number, _percent: number | undefined) => {
    if(_percent === undefined) return;

    // round percent to step
    const _step = getRelativeStep(_percent);
    if(_step !== undefined){
      _percent = roundToStep(_percent, _step);
    }

    if(index < 2){
      pointer1.updatePosition(_percent, getPointer1LeftWall(), getPointer1RightWall(), type, rightToLeft, bottomToTop);
    }
    else{
      pointer2?.updatePosition(_percent, getPointer2LeftWall(), getPointer2RightWall(), type, rightToLeft, bottomToTop);
    }

    panelFill?.updatePosition(type, pointer1.percent, pointer2?.percent, rightToLeft, bottomToTop);

    const value1text = getTextValue(pointer1.percent);
    const value2text = getTextValue(pointer2?.percent);

    updatePlugins();

    if(value1text !== undefined){
      pointer1.setAttr('aria-valuenow', value1text.toString());
      pointer1.setAttr('aria-valuetext', value1text.toString());
    }

    if(value2text !== undefined && pointer2){
      pointer2.setAttr('aria-valuenow', value2text.toString());
      pointer2.setAttr('aria-valuetext', value2text.toString());
    }

    setAriaMinMax();

    sendChangeEvent($component, getTextValue(pointer1.percent), getTextValue(pointer2?.percent));
  };

  /**
   * on component init, min and max should be initialized together
   * because their validations depend on each other;
   */
  const setMinMax = (_min: number | string | undefined | null, _max: number | string | undefined | null) => {

    min = data !== undefined ? 0 : getNumber(_min, MIN_DEFAULT);
    max = data !== undefined ? data.length - 1 : getNumber(_max, MAX_DEFAULT);

    // perform validations
    setMin(min);
    setMax(max);
  };

  const setAriaMinMax = () => {
    if(pointer1){
      pointer1.setAttr('aria-valuemin', (getPointerMin(1) ?? '').toString());
      pointer1.setAttr('aria-valuemax', (getPointerMax(1) ?? '').toString());
    }

    if(pointer2){
      pointer2.setAttr('aria-valuemin', (getPointerMin(2) ?? '').toString());
      pointer2.setAttr('aria-valuemax', (getPointerMax(2) ?? '').toString());
    }
  };

  const setMin = (_min: number | string | undefined | null) => {
    min = getNumber(_min, MIN_DEFAULT);

    if(min > max){
      max = min + MAX_DEFAULT;
    }

    setPositions(1, pointer1.percent);
    setPositions(2, pointer2?.percent);
  };

  const setMax = (_max: number | string | undefined | null) => {

    max = getNumber(_max, MAX_DEFAULT);

    if(max < min){
      max = min + MAX_DEFAULT;
    }

    setPositions(1, pointer1.percent);
    setPositions(2, pointer2?.percent);
  };

  /**
   * on component init, value, value1, and value2 should be initialized together
   * because their validations may depend on each other;
   */
  const setInitialPointersValues = (_value: string | null, _value1: string | null, _value2: string | null) => {

    // init initial values with pointers overlap ----------
    pointersOverlap = true;
    const val1str = _value1 !== null ? _value1 : _value;

    setValue(val1str, 1);
    setValue(_value2, 2);
    pointersOverlap = false;

    // add all required validations ------------------------
    setValue(val1str, 1);
    setValue(_value2, 2);
  };

  const setValue = (_val: number | string | undefined | null, index: number) => {

    let val: number;

    // handle the case when we set value2 and pointer2 doesn't exist,
    // or the case when we remove the existing second pointer
    if(index === 2){
      if(_val !== undefined && _val !== null && !pointer2){
        addSecondPointer();
      }

      if((_val === undefined || _val === null) && !!pointer2){
        removeSecondPointer();
        setRangeDragging(false);
      }
    }

    if(data !== undefined){

      val = (_val === undefined || _val === null) ? 0 : findValueIndexInData(_val, data);
      if(val === -1){
        val = 0;
      }
    }
    else{
      val = getNumber(_val, min);

      if(val < min){
        val = min;
      }

      if(val > max){
        val = max;
      }
    }

    // scale a range [min,max] to [a,b]
    const percent = convertRange(min, max, 0, 100, val);

    setPositions(index, percent);
    removeFocus();
  };

  const setStep = (_step: TStep) => {
    if(_step === null || _step === undefined){
      step = undefined;
      return;
    }

    if (typeof _step === 'function') {
      step = _step;
      return;
    }

    if(isNumber(_step)){
      step = getNumber(_step, 1);

      const diff = Math.abs(max - min);
      if (step > diff) {
        step = undefined;
      }
      return;
    }

    step = undefined;
  };

  const setPointersOverlap = (_pointersOverlap: boolean) => {
    pointersOverlap = _pointersOverlap;
    setPositions(1, pointer1.percent);
  };

  const setPointersMinDistance = (_pointersMinDistance: number) => {
    if(!isNumber(_pointersMinDistance) || _pointersMinDistance < 0){
      _pointersMinDistance = 0;
    }
    pointersMinDistance = _pointersMinDistance;
  };

  const setPointersMaxDistance = (_pointersMaxDistance: number) => {
    if(!isNumber(_pointersMaxDistance) || _pointersMaxDistance < 0){
      _pointersMaxDistance = Infinity;
    }
    pointersMaxDistance = _pointersMaxDistance;
  };

  const setDisabled = (_disabled: boolean) => {
    disabled = _disabled;
    $slider.classList.toggle('disabled', disabled);

    if(disabled){
      $slider.setAttribute('aria-disabled', 'true');
    }
    else{
      if ($slider.hasAttribute('aria-disabled')) {
        $slider.removeAttribute('aria-disabled');
      }
    }
  };

  const setData = (_data: TData | string | number | null) => {

    if(_data === null || _data === undefined){
      data = undefined;
      return;
    }

    data = parseData(_data as string);
    if(data === undefined || data.length <= 0){
      data = undefined;
      return;
    }

    setMin(0);
    setMax(data.length - 1);

    if(step === undefined){
      setStep(1);
    }
  };

  const setType = (_type: string | null | undefined) => {

    if(typeof _type === 'string'){
      type = _type.trim().toLowerCase() === TypeEnum.Vertical ? TypeEnum.Vertical : TypeEnum.Horizontal;
    }
    else{
      type = TypeEnum.Horizontal;
    }

    const $box = $component.shadowRoot?.querySelector('.range-slider-box');
    if(!$box) return;
    $box.className = `range-slider-box type-${ type }`;

    // update fill position and pointers positions
    setPositions(1, pointer1.percent);

    if(pointer2){
      setPositions(2, pointer2.percent);
    }

    // update accessibility properties
    const aria = type === TypeEnum.Vertical ?  'vertical' : 'horizontal';
    pointer1.setAttr('aria-orientation', aria);
    pointer2?.setAttr('aria-orientation', aria);
  };

  const setRightToLeft = (_rightToLeft: boolean) => {
    rightToLeft = _rightToLeft;

    if(pointer2){
      // change pointers order
      if(rightToLeft){
        // pointer1 should be after pointer2
        pointer2.$pointer.after(pointer1.$pointer);
      }
      else{
        // pointer2 should be after pointer1
        pointer1.$pointer.after(pointer2.$pointer);
      }
    }

    setPositions(1, pointer1.percent);
    setPositions(2, pointer2?.percent);

    updatePlugins();
  };

  const setBottomToTop = (_bottomToTop: boolean) => {
    bottomToTop = _bottomToTop;

    if(pointer2){
      // change pointers order
      if(bottomToTop){
        // pointer1 should be after pointer2
        pointer2.$pointer.after(pointer1.$pointer);
      }
      else{
        // pointer2 should be after pointer1
        pointer1.$pointer.after(pointer2.$pointer);
      }
    }

    setPositions(1, pointer1.percent);
    setPositions(2, pointer2?.percent);

    updatePlugins();
  };

  const setRound = (_round: number) => {
    round = getNumber(_round, ROUND_DEFAULT);

    if(round < 0){
      round = ROUND_DEFAULT;
    }

    updatePlugins();
  };

  const setAnimateOnClick = (_animateOnClick: string | null | undefined) => {
    if(_animateOnClick === null || _animateOnClick === undefined){
      animateOnClick = undefined;
      $slider.style.removeProperty(CSSVariables.AnimateOnClick);
      $slider.classList.remove(CssClasses.AnimateOnClick);
    }
    else{
      animateOnClick = _animateOnClick;
      $slider.style.setProperty(CSSVariables.AnimateOnClick, animateOnClick);
      $slider.classList.add(CssClasses.AnimateOnClick);
    }
  };

  const setAriaLabel = (_ariaLabel: string | undefined, index: number) => {

    if(index < 2){
      ariaLabel1 = _ariaLabel;
      pointer1.setAttr('aria-label', _ariaLabel);
    }
    else{
      ariaLabel2 = _ariaLabel;
      pointer2?.setAttr('aria-label', _ariaLabel);
    }
  };

  const setRangeDragging = (_rangeDragging: boolean) => {
    rangeDraggingStart = undefined;

    if(!pointer2){
      rangeDragging = false;
      $slider.classList.remove(CssClasses.RangeDragging);
      return;
    }

    rangeDragging = _rangeDragging;
    $slider.classList.toggle(CssClasses.RangeDragging, rangeDragging);
  };

  // initialization ....
  (() => {

    // init pointers
    pointer1.setCallbacks(arrowLeft, arrowRight, arrowUp, arrowDown);
    pointer2?.setCallbacks(arrowLeft, arrowRight, arrowUp, arrowDown);

    // init panel fill
    const $fill = $component.shadowRoot?.querySelector('.panel-fill') as HTMLElement;
    if($fill){
      panelFill = PanelFill($fill);
    }

    // init main properties from HTML attributes
    setType($component.getAttribute(AttributesEnum.Type));
    setRightToLeft(getBoolean($component.getAttribute(AttributesEnum.RightToLeft)));
    setBottomToTop(getBoolean($component.getAttribute(AttributesEnum.BottomToTop)));

    setMinMax($component.getAttribute(AttributesEnum.Min), $component.getAttribute(AttributesEnum.Max));
    setStep($component.getAttribute(AttributesEnum.Step));
    setData($component.getAttribute(AttributesEnum.Data));

    // set value and render the pointers ----------------------
    setInitialPointersValues(
      $component.getAttribute(AttributesEnum.Value),
      $component.getAttribute(AttributesEnum.Value1),
      $component.getAttribute(AttributesEnum.Value2)
    );

    // overlaps MUST be defined after the pointer values
    setPointersOverlap(getBoolean($component.getAttribute(AttributesEnum.PointersOverlap)));
    setPointersMinDistance(getNumber($component.getAttribute(AttributesEnum.PointersMinDistance), 0));
    setPointersMaxDistance(getNumber($component.getAttribute(AttributesEnum.PointersMaxDistance), Infinity));
    setRangeDragging(getBoolean($component.getAttribute(AttributesEnum.RangeDragging)));

    // additional properties -----------------------------
    setDisabled(getBoolean($component.getAttribute(AttributesEnum.Disabled)));
    keyboardDisabled = getBoolean($component.getAttribute(AttributesEnum.KeyboardDisabled))
    pointer1.disabled = getBoolean($component.getAttribute(AttributesEnum.Pointer1Disabled));

    if(pointer2){
      pointer2.disabled = getBoolean($component.getAttribute(AttributesEnum.Pointer2Disabled));
    }

    setRound(getNumber($component.getAttribute(AttributesEnum.Round), ROUND_DEFAULT));

    const ariaLabel1 = $component.getAttribute(AttributesEnum.AriaLabel1);
    if(ariaLabel1 !== null){
      setAriaLabel(ariaLabel1, 1);
    }

    const ariaLabel2 = $component.getAttribute(AttributesEnum.AriaLabel2);
    if(ariaLabel2 !== null && pointer2){
      setAriaLabel(ariaLabel2, 2);
    }

    // init styles ---------
    styles = Styles($component, $slider, pointer2?.$pointer);
    setAnimateOnClick($component.getAttribute(AttributesEnum.AnimateOnClick));

    // init slider events -------------------------------------
    $slider.addEventListener('mousedown', onMouseDown);
    $slider.addEventListener('mouseup', onMouseUp);
    $slider.addEventListener('touchmove', onValueChange);
    $slider.addEventListener('touchstart', onValueChange);
    document.addEventListener('wheel', pointerMouseWheel, { passive: false });

    // init plugins ---------------
    pluginsManager = PluginsManager($component, requestUpdatePlugins, updatePointersFromPlugins);
    pluginsManager.init();
  })();

  const destroy = () => {
    $slider.removeEventListener('mousedown', onMouseDown);
    $slider.removeEventListener('mouseup', onMouseUp);
    $slider.removeEventListener('touchmove', onValueChange);
    $slider.removeEventListener('touchstart', onValueChange);
    document.removeEventListener('wheel', pointerMouseWheel);

    pointer1.destroy();
    pointer2?.destroy();
  };

  return {
    get pointer1() {
      return pointer1;
    },

    get pointer2() {
      return pointer2;
    },

    get styles() {
      return styles;
    },

    get pluginsManager() {
      return pluginsManager;
    },

    get min() {
      return getMin();
    },

    get max() {
      return getMax();
    },

    get step() {
      return step;
    },

    get pointersOverlap() {
      return pointersOverlap;
    },

    set pointersOverlap(_pointersOverlap) {
      setPointersOverlap(_pointersOverlap);
    },

    get pointersMinDistance() {
      return pointersMinDistance;
    },

    set pointersMinDistance(_pointersMinDistance) {
      setPointersMinDistance(_pointersMinDistance);
    },

    get pointersMaxDistance() {
      return pointersMaxDistance;
    },

    set pointersMaxDistance(_pointersMaxDistance) {
      setPointersMaxDistance(_pointersMaxDistance);
    },

    get disabled() {
      return disabled;
    },

    set disabled(_disabled) {
      setDisabled(_disabled);
    },

    get data() {
      return data;
    },

    get type() {
      return type;
    },

    set type(_type) {
      setType(_type);
    },

    get rightToLeft() {
      return rightToLeft;
    },

    set rightToLeft(_rightToLeft) {
      setRightToLeft(_rightToLeft);
    },

    get bottomToTop() {
      return bottomToTop;
    },

    set bottomToTop(_bottomToTop) {
      setBottomToTop(_bottomToTop);
    },

    get round() {
      return round;
    },

    set round(_round) {
      setRound(_round);
    },

    get animateOnClick() {
      return animateOnClick;
    },

    set animateOnClick(_animateOnClick) {
      setAnimateOnClick(_animateOnClick);
    },

    get keyboardDisabled() {
      return keyboardDisabled;
    },

    set keyboardDisabled(_keyboardDisabled){
      keyboardDisabled = _keyboardDisabled;
    },

    get ariaLabel1(){
      return ariaLabel1;
    },

    set ariaLabel1(_ariaLabel1){
      setAriaLabel(_ariaLabel1, 1);
    },

    get ariaLabel2(){
      return ariaLabel2;
    },

    set ariaLabel2(_ariaLabel2){
      setAriaLabel(_ariaLabel2, 2);
    },

    get rangeDragging() {
      return rangeDragging;
    },

    set rangeDragging(_rangeDragging) {
      setRangeDragging(_rangeDragging);
    },

    setMin,
    setMax,
    setValue,
    setStep,
    setData,
    getTextValue,
    destroy,
  };
};
