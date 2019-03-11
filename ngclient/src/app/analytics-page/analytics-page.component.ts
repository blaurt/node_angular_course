import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { AnalyticsService } from "../shared/service/analytics.service";
import { LoaderComponent } from "../shared/components/loader/loader.component";
import { IAnalyticsPage } from "../shared/interfaces/analytics";
import { Chart, ChartConfiguration } from "chart.js";

@Component({
  selector: "app-analytics-page",
  templateUrl: "./analytics-page.component.html",
  styleUrls: ["./analytics-page.component.scss"]
})
export class AnalyticsPageComponent implements AfterViewInit {
  @ViewChild("revenue") revenueRef: ElementRef<HTMLCanvasElement>;
  @ViewChild("orders") ordersRef: ElementRef<HTMLCanvasElement>;

  public average: number = 0;
  public pending: boolean = true;
  public data: IAnalyticsPage;
  constructor(private service: AnalyticsService) {}

  async ngAfterViewInit() {
    const revenueChartConfig: any = {
      label: "Revenue",
      color: "rgb(255,99,132)"
    };

    const ordersChartConfig: any = {
      label: "Orders",
      color: "rgb(54,162,235)"
    };

    try {
      LoaderComponent.showPreloader();
      this.data = await this.service.getAnalytics().toPromise();

      this.average = this.data.average;
      revenueChartConfig.labels = this.data.chart.map(item => item.label);
      revenueChartConfig.data = this.data.chart.map(item => item.revenue);

      ordersChartConfig.labels = this.data.chart.map(item => item.label);
      ordersChartConfig.data = this.data.chart.map(item => item.order);

      // **** Gain ****
      revenueChartConfig.labels.push("08.05.2018");
      revenueChartConfig.labels.push("09.05.2018");
      revenueChartConfig.data.push(1500);
      revenueChartConfig.data.push(700);
      //  **** /Gain ****

      // **** Order ****
      ordersChartConfig.labels.push("08.05.2018");
      ordersChartConfig.labels.push("09.05.2018");
      ordersChartConfig.data.push(8);
      ordersChartConfig.data.push(2);
      // **** /Order ****

      const revenueCtx = this.revenueRef.nativeElement.getContext("2d");
      const ordersCtx = this.ordersRef.nativeElement.getContext("2d");
      (revenueCtx.canvas as any).height = "300px";
      (ordersCtx.canvas as any).height = "300px";
      new Chart(revenueCtx, createChartConfig(revenueChartConfig));
      new Chart(ordersCtx, createChartConfig(ordersChartConfig));

      this.pending = false;
    } finally {
      LoaderComponent.hidePreloader();
    }
  }
}

function createChartConfig({ label, labels, data, color }): ChartConfiguration {
  return {
    type: "line",
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  };
}
