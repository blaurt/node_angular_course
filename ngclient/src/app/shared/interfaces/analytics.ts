export interface IAnalyticsChartItem {
  revenue: number;
  order: number;
  label: string;
}

export interface IAnalyticsPage {
  average: number;
  chart: IAnalyticsChartItem[];
}
