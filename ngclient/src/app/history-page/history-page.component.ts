import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  OnDestroy
} from "@angular/core";
import {
  MaterialService,
  ModalInstance
} from "../shared/service/material.service";

@Component({
  selector: "app-history-page",
  templateUrl: "./history-page.component.html",
  styleUrls: ["./history-page.component.scss"]
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isFilterVisible: boolean = false;
  @ViewChild("tooltip") tooltipRef: ElementRef;
  tooltip: ModalInstance = null;
  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    this.tooltip.destroy();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }
}
