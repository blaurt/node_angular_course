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
import { OrdersService } from "../shared/service/orders.service";
import { Order } from "../shared/interfaces/order";
import { LoaderComponent } from "../shared/components/loader/loader.component";
import { Filter } from "../shared/interfaces/filter";

export const STEP = 2;

@Component({
  selector: "app-history-page",
  templateUrl: "./history-page.component.html",
  styleUrls: ["./history-page.component.scss"]
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  public isFilterVisible: boolean = false;
  public offset: number = 0;
  public limit: number = STEP;
  public orders: Order[] = [];
  public loading: boolean = false;
  public noMoreOrders: boolean = false;
  public tooltip: ModalInstance = null;
  public filter: Filter = {};

  @ViewChild("tooltip") tooltipRef: ElementRef;
  constructor(private ordersService: OrdersService) {}

  async ngOnInit() {
    this.orders = await this.fetch();
  }

  ngOnDestroy() {
    this.tooltip.destroy();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  private async fetch() {
    this.loading = true;
    const { offset, limit } = this;
    const params = Object.assign({}, this.filter, {
      offset: offset.toString(),
      limit: limit.toString()
    });
    try {
      LoaderComponent.showPreloader();
      return await this.ordersService.fetch(params).toPromise();
    } catch (error) {
      MaterialService.toast(error.error.message);
    } finally {
      LoaderComponent.hidePreloader();
      this.loading = false;
    }
  }

  async onLoadMore() {
    this.offset += STEP;
    const orders = await this.fetch();
    if (orders.length < STEP) {
      this.noMoreOrders = true;
    }
    this.orders.push(...orders);
  }

  async applyFilter(filter: Filter) {
    this.filter = filter;
    this.orders = [];
    this.offset = 0;
    this.loading = true;
    this.orders = await this.fetch();
  }

  isFiltered() {
    return !!Object.keys(this.filter).length;
  }
}
