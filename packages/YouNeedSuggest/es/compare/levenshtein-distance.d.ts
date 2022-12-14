export type TWeightOptions = {
    continuous: number;
    count: number;
    position: number;
    distance: number;
};
export type TDistanceOptions = TWeightOptions;
export declare const compare: (weight: TWeightOptions) => (inputValue: string, comparedValue: string) => number;
