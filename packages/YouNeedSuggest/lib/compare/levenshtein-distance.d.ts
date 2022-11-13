export declare type TWeightOptions = {
    continuous: number;
    count: number;
    position: number;
    distance: number;
};
export declare type TDistanceOptions = TWeightOptions;
export declare const compare: (weight: TWeightOptions) => (inputValue: string, comparedValue: string) => number;
