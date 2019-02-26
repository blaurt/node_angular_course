import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { Order } from "src/app/shared/interfaces/order";
import {
  MaterialService,
  ModalInstance
} from "src/app/shared/service/material.service";

const CURRENCY_SYMBOL = "USD";

@Component({
  selector: "app-history-list",
  templateUrl: "./history-list.component.html",
  styleUrls: ["./history-list.component.scss"]
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {
  @Input() orders: Order[] = [];
  @ViewChild("modal") modalRef: ElementRef;
  selectedOrder: Order = null;
  modal: ModalInstance;
  constructor() {}

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  computePrice(order: Order) {
    const price = order.list.reduce(
      (currentValue, item) => currentValue + item.cost * item.quantity,
      0
    );

    return `${price} ${CURRENCY_SYMBOL}`;
  }

  onOrderSelect(order: Order) {
    this.selectedOrder = order;
    this.modal.open();
  }

  onCloseModal() {
    this.modal.close();
  }
}
