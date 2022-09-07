import { IPointer } from './pointer';
import { TData, TStep } from '../types';
import { TypeEnum } from '../enums/type-enum';
import { ILabels } from './labels';
import { IStyles } from './styles';
import { StorageTypeEnum } from '../enums/storage-type-enum';
export interface ISlider {
    readonly pointer1: IPointer;
    readonly pointer2: IPointer | null;
    readonly labels: ILabels | null;
    readonly styles: IStyles | null;
    pointersOverlap: boolean;
    pointersMinDistance: number;
    pointersMaxDistance: number;
    readonly min: number;
    readonly max: number;
    readonly step: TStep;
    readonly data: TData;
    type: TypeEnum;
    rightToLeft: boolean;
    bottomToTop: boolean;
    disabled: boolean;
    keyboardDisabled: boolean;
    generateLabels: boolean;
    round: number;
    animateOnClick: string | undefined;
    storage: StorageTypeEnum | undefined;
    storageKey: string;
    readonly storageKey2: string;
    setMin: (value: number | string | undefined | null) => void;
    setMax: (value: number | string | undefined | null) => void;
    setValue: (value: number | string | undefined | null, index: number) => void;
    setStep: (value: TStep) => void;
    setData: (value: TData | string | null | number) => void;
    getTextValue: (_percent: number | undefined) => undefined | string | number;
    destroy: () => void;
}
export declare const MIN_DEFAULT = 0;
export declare const MAX_DEFAULT = 100;
export declare const ROUND_DEFAULT = 2;
export declare const Slider: ($component: HTMLElement, $slider: HTMLElement, pointer1: IPointer, pointer2: IPointer | null) => ISlider;
//# sourceMappingURL=slider.d.ts.map