import RangeSlider from '../../../core';
import { IBindingLabelsPlugin } from '../../../plugins/binding-labels-plugin';
import { IGeneratedLabelsPlugin } from '../../../plugins/generated-labels-plugin';

export const getSetValuesExamples = () => {
  if(!document.querySelector('[data-examples="get-set-values"]')) return;

  try{
    const $slider1 = document.getElementById('slider-1') as RangeSlider;
    const $label1 = document.getElementById('label-1') as HTMLElement;

    $slider1.addEventListener('change', (evt: CustomEvent) => {
      $label1.textContent = evt.detail.value;
    });

    $slider1.value = 50;
  }
  catch(ex) { console.error(ex); }

  try{
    const $slider2 = document.getElementById('slider-2') as RangeSlider;
    const $label2 = document.getElementById('label-2') as HTMLElement;
    const $label3 = document.getElementById('label-3') as HTMLElement;

    $slider2.addEventListener('change', (evt: CustomEvent) => {
      $label2.textContent = evt.detail.value;
      $label3.textContent = evt.detail.value2;
    });

    $slider2.value1 = 40;
    $slider2.value2 = 80;
  }
  catch(ex) { console.error(ex); }
};

export const autoBindingValuesExamples = () => {
  if(!document.querySelector('[data-examples="auto-binding-values"]')) return;

  try{
    const $slider2 = document.getElementById('slider-2') as RangeSlider;

    ($slider2 as IBindingLabelsPlugin).valueLabel = '.value-22';
    // $slider2.setAttribute('value-label', '.value-22');
  }
  catch(ex) { console.error(ex); }
};

export const autoGeneratedLabelsExamples = () => {
  if(!document.querySelector('[data-examples="auto-generated-labels"]')) return;

  try{
    const $slider = document.getElementById('slider-3');
    if(!$slider) return;

    const $btn = document.getElementById('toggle-gen-labels');
    if(!$btn) return;

    $btn.addEventListener('click', () => {
      const $plugin = ($slider as IGeneratedLabelsPlugin);
      $plugin.generateLabels = !$plugin.generateLabels;
      // $slider.setAttribute('generate-labels', (!$plugin.generateLabels) + '');
    });
  }
  catch(ex) { console.error(ex); }
};

export const minMaxExamples = () => {
  if(!document.querySelector('[data-examples="min-max"]')) return;

  try{
    const $slider = document.getElementById('slider-4') as RangeSlider;
    const $changeBtn = document.getElementById('set-min-max-btn') as HTMLElement;
    const $resetBtn = document.getElementById('set-min-max-btn-reset') as HTMLElement;

    $changeBtn.addEventListener('click', () => {
      $slider.min = -200;
      $slider.max = 200;
    });

    $resetBtn.addEventListener('click', () => {
      $slider.min = -500;
      $slider.max = 500;
    });
  }
  catch(ex) { console.error(ex); }
};

export const roundExamples = () => {
  if(!document.querySelector('[data-examples="rounding"]')) return;

  try{
    const $slider = document.getElementById('slider-5') as RangeSlider;
    const $changeBtn = document.getElementById('rounding-btn') as HTMLElement;
    const $resetBtn = document.getElementById('rounding-reset') as HTMLElement;

    $changeBtn.addEventListener('click', () => {
      $slider.round = 0;
    });

    $resetBtn.addEventListener('click', () => {
      $slider.round = 2;
    });
  }
  catch(ex) { console.error(ex); }
};

export const stepExamples = () => {
  if(!document.querySelector('[data-examples="step"]')) return;

  try{
    const $slider = document.getElementById('slider-6') as RangeSlider;
    const $changeBtn = document.getElementById('step-btn') as HTMLElement;
    const $resetBtn = document.getElementById('step-reset') as HTMLElement;

    /*// get the step value
    const step: TStep = $slider.step;
    console.log(step);*/

    $changeBtn.addEventListener('click', () => {
      $slider.step = 10;
    });

    $resetBtn.addEventListener('click', () => {
      $slider.step = undefined;
    });
  }
  catch(ex) { console.error(ex); }
};

export const nonLinearStepExamples = () => {
  if(!document.querySelector('[data-examples="non-linear-step"]')) return;

  // non linear step example
  try{
    const $slider = document.getElementById('slider-7') as RangeSlider;
    $slider.step = (_value: string | number, _percent: number) => {
      return _value < 50 ? 5 : 10;
    };
  }
  catch(ex) { console.error(ex); }
};

export const dataExamples = () => {
  if(!document.querySelector('[data-examples="data"]')) return;

  // non linear step example
  try{
    const $slider = document.getElementById('slider-8') as RangeSlider;
    const $changeBtn = document.getElementById('data-btn') as HTMLElement;
    const $resetBtn = document.getElementById('data-reset') as HTMLElement;

    $changeBtn.addEventListener('click', () => {
      $slider.data = ['red', 'green', 'blue', 'yellow', 'pink', 'brown', 'silver', 'white', 'black'];
    });

    $resetBtn.addEventListener('click', () => {
      $slider.data = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    });
  }
  catch(ex) { console.error(ex); }
};

export const withHeightBorderRadiusExamples = () => {
  if(!document.querySelector('[data-examples="width-height-border-radius"]')) return;

  try{
    const $slider = document.getElementById('slider-9') as RangeSlider;
    const $changeBtn = document.getElementById('styles-btn') as HTMLElement;
    const $resetBtn = document.getElementById('styles-reset') as HTMLElement;

    $changeBtn.addEventListener('click', () => {
      $slider.sliderWidth = '200px';
      $slider.sliderHeight = '0.7rem';
      $slider.sliderRadius = 0;

      $slider.pointerWidth = '1.8rem';
      $slider.pointerHeight = '1.8rem';
      $slider.pointerRadius = 0;

      $slider.pointer2Width = '1.3rem';
      $slider.pointer2Height = '1.3rem';
      $slider.pointer2Radius = '1rem';
    });

    $resetBtn.addEventListener('click', () => {
      $slider.sliderWidth = '300px';
      $slider.sliderHeight = '0.25rem';
      $slider.sliderRadius = '1rem';

      $slider.pointerWidth = '1rem';
      $slider.pointerHeight = '1rem';
      $slider.pointerRadius = '100%';

      $slider.pointer2Width = '1rem';
      $slider.pointer2Height = '1rem';
      $slider.pointer2Radius = '100%';
    });
  }
  catch(ex) { console.error(ex); }
};

export const colorExamples = () => {
  if(!document.querySelector('[data-examples="colors"]')) return;

  try{
    const $slider = document.getElementById('slider-10') as RangeSlider;
    const $changeBtn = document.getElementById('color-btn') as HTMLElement;
    const $resetBtn = document.getElementById('color-reset') as HTMLElement;

    $changeBtn.addEventListener('click', () => {
      $slider.sliderBg = '#efefef';
      $slider.sliderBgHover = '#ddd';
      $slider.sliderBgFill = '#ccc';

      $slider.pointer1Bg = 'red';
      $slider.pointer2Bg = 'green';
      $slider.pointer3Bg = 'blue';

      $slider.pointer1Border = 'none';
      $slider.pointer2Border = 'none';
      $slider.pointer3Border = 'none';
    });

    $resetBtn.addEventListener('click', () => {
      $slider.sliderBg = undefined;
      $slider.sliderBgHover = undefined;
      $slider.sliderBgFill = undefined;

      $slider.pointer1Bg = undefined;
      $slider.pointer2Bg = undefined;
      $slider.pointer3Bg = undefined;

      $slider.pointer1Border = undefined;
      $slider.pointer2Border = undefined;
      $slider.pointer3Border = undefined;
    });
  }
  catch(ex) { console.error(ex); }
};

export const themesExamples = () => {
  if(!document.querySelector('[data-examples="themes"]')) return;

  try{
    const $slider = document.getElementById('slider-11') as RangeSlider;
    const $rect = document.getElementById('rect-btn') as HTMLElement;
    const $glass = document.getElementById('glass-btn') as HTMLElement;
    const $circle = document.getElementById('circle-btn') as HTMLElement;
    const $rainbow = document.getElementById('rainbow-btn') as HTMLElement;

    $rect.addEventListener('click', () => {
      $slider.theme = 'rect';
    });

    $glass.addEventListener('click', () => {
      $slider.theme = 'glass';
    });

    $circle.addEventListener('click', () => {
      $slider.theme = 'circle';
    });

    $rainbow.addEventListener('click', () => {
      $slider.theme = 'rainbow';
    });
  }
  catch(ex) { console.error(ex); }
};

export const pointerShapesExamples = () => {
  if(!document.querySelector('[data-examples="pointer-shapes"]')) return;

  try{
    const $slider = document.getElementById('slider-12') as RangeSlider;
    const $triangle = document.getElementById('shape-triangle-btn') as HTMLElement;
    const $star = document.getElementById('shape-star-btn') as HTMLElement;
    const $rhombus = document.getElementById('shape-rhombus-btn') as HTMLElement;
    const $trapezoid = document.getElementById('shape-trapezoid-btn') as HTMLElement;
    const $parallelogram = document.getElementById('shape-parallelogram-btn') as HTMLElement;
    const $rightArrow = document.getElementById('shape-right-arrow-btn') as HTMLElement;

    $triangle.addEventListener('click', () => {
      $slider.pointerShape = 'triangle';
    });

    $star.addEventListener('click', () => {
      $slider.pointerShape = 'star';
    });

    $rhombus.addEventListener('click', () => {
      $slider.pointerShape = 'rhombus';
    });

    $trapezoid.addEventListener('click', () => {
      $slider.pointerShape = 'trapezoid';
    });

    $parallelogram.addEventListener('click', () => {
      $slider.pointerShape = 'parallelogram';
    });

    $rightArrow.addEventListener('click', () => {
      $slider.pointerShape = 'right-arrow';
    });
  }
  catch(ex) { console.error(ex); }
};

export const animationShapesExamples = () => {
  if(!document.querySelector('[data-examples="animation"]')) return;

  try{
    const $slider = document.getElementById('slider-13') as RangeSlider;
    const $animation2s = document.getElementById('animation-2s-btn') as HTMLElement;
    const $disable = document.getElementById('animation-disable-btn') as HTMLElement;
    const $reset = document.getElementById('animation-reset-btn') as HTMLElement;

    $animation2s.addEventListener('click', () => {
      $slider.animateOnClick = '2s';
    });

    $disable.addEventListener('click', () => {
      $slider.animateOnClick = false;
    });

    $reset.addEventListener('click', () => {
      $slider.animateOnClick = '0.3s';
    });
  }
  catch(ex) { console.error(ex); }
};

export const verticalExamples = () => {
  if(!document.querySelector('[data-examples="vertical"]')) return;

  try{
    const $slider = document.getElementById('slider-14') as RangeSlider;
    const $vertical = document.getElementById('vertical-btn') as HTMLElement;
    const $horizontal = document.getElementById('horizontal-btn') as HTMLElement;

    $vertical.addEventListener('click', () => {
      $slider.type = 'vertical';
    });

    $horizontal.addEventListener('click', () => {
      $slider.type = 'horizontal';
    });
  }
  catch(ex) { console.error(ex); }

  try{
    const $slider = document.getElementById('slider-14_2') as RangeSlider;
    const $btt = document.getElementById('btt-btn') as HTMLElement;
    const $ttb = document.getElementById('ttb-btn') as HTMLElement;

    $btt.addEventListener('click', () => {
      $slider.btt = true;
    });

    $ttb.addEventListener('click', () => {
      $slider.btt = false;
    });
  }
  catch(ex) { console.error(ex); }
};

export const rightToLeftExamples = () => {
  if(!document.querySelector('[data-examples="rtl"]')) return;

  try{
    const $slider = document.getElementById('slider-15') as RangeSlider;
    const $rtl = document.getElementById('rtl-btn') as HTMLElement;
    const $ltr = document.getElementById('ltr-btn') as HTMLElement;

    $rtl.addEventListener('click', () => {
      $slider.rtl = true;
    });

    $ltr.addEventListener('click', () => {
      $slider.rtl = false;
    });
  }
  catch(ex) { console.error(ex); }
};

export const disabledExamples = () => {
  if(!document.querySelector('[data-examples="disabled"]')) return;

  try{
    const $slider = document.getElementById('slider-16') as RangeSlider;
    const $btn = document.getElementById('disabled-toggle-btn') as HTMLElement;

    $btn.addEventListener('click', () => {
      $slider.disabled = !$slider.disabled;
    });
  }
  catch(ex) { console.error(ex); }

  try{
    const $slider = document.getElementById('slider-17') as RangeSlider;
    const $btn = document.getElementById('disabled-pointers-toggle-btn') as HTMLElement;

    $btn.addEventListener('click', () => {
      $slider.pointer1Disabled = !$slider.pointer1Disabled;
      $slider.pointer2Disabled = !$slider.pointer2Disabled;
    });
  }
  catch(ex) { console.error(ex); }
};