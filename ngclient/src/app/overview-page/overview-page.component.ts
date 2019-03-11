import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from "@angular/core";
import { AnalyticsService } from "../shared/service/analytics.service";
import { IOverviewPage } from "../shared/interfaces/overviewPage";
import { LoaderComponent } from "../shared/components/loader/loader.component";
import {
  ModalInstance,
  MaterialService
} from "../shared/service/material.service";

@Component({
  selector: "app-overview-page",
  templateUrl: "./overview-page.component.html",
  styleUrls: ["./overview-page.component.scss"]
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  public tapTarget: ModalInstance;
  public overview: IOverviewPage = undefined;
  public yesterdayDate;
  constructor(private service: AnalyticsService) {}

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
  }

  ngOnDestroy(): void {
    this.tapTarget.destroy();
  }
  @ViewChild("tapTarget") tapTargetRef: ElementRef;

  async ngOnInit() {
    this.yesterdayDate = new Date();
    this.yesterdayDate.setDate(this.yesterdayDate.getDate() - 1);
    try {
      LoaderComponent.showPreloader();
      this.overview = await this.service.getOverview().toPromise();
    } catch (error) {
      console.log(error);
    } finally {
      LoaderComponent.hidePreloader();
    }
  }

  onOpenInfo() {
    this.tapTarget.open();
  }
}
