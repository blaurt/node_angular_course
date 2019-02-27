import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from "@angular/core";
import { Filter } from "src/app/shared/interfaces/filter";
import {
  MaterialService,
  MaterialDatePicker
} from "src/app/shared/service/material.service";

@Component({
  selector: "app-history-filter",
  templateUrl: "./history-filter.component.html",
  styleUrls: ["./history-filter.component.scss"]
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {
  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild("startDate") startDateRef: ElementRef;
  @ViewChild("endDate") endDateRef: ElementRef;
  startPicker: MaterialDatePicker;
  endPicker: MaterialDatePicker;

  order: number;
  isValid: boolean = true;
  constructor() {}

  onSubmitFilter() {
    const filter: Filter = {};
    if (this.order) {
      filter.order = this.order;
    }

    if (this.startPicker.date) {
      filter.start = this.startPicker.date;
    }

    if (this.endPicker.date) {
      filter.end = this.endPicker.date;
    }

    this.onFilter.emit(filter);
  }

  validate() {
    if (!this.startPicker.date || !this.endPicker.date) {
      this.isValid = true;
      return this.isValid;
    }

    this.isValid = this.startPicker.date < this.endPicker.date;
    return this.isValid;
  }

  ngOnDestroy() {
    this.startPicker.destroy();
    this.endPicker.destroy();
  }

  ngAfterViewInit() {
    this.startPicker = MaterialService.initDatePicker(
      this.startDateRef,
      this.validate.bind(this)
    );

    this.endPicker = MaterialService.initDatePicker(
      this.endDateRef,
      this.validate.bind(this)
    );
  }

 
}
