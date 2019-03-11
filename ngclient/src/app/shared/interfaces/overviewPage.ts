export interface IOverviewPage {
    orders : IOverviewItem;
    gain: IOverviewItem;
}

export interface  IOverviewItem {
    percent: number;
    compare: number;
    yesterday: number;
    isHigher: boolean;
}