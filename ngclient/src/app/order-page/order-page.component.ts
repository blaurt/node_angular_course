import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import {
  MaterialService,
  ModalInstance
} from "../shared/service/material.service";
import { Position } from "../shared/interfaces/position";
import { OrderService } from "./order.service";
import { Order } from "../shared/interfaces/order";
import { OrdersService } from "../shared/service/orders.service";

@Component({
  selector: "app-order-page",
  templateUrl: "./order-page.component.html",
  styleUrls: ["./order-page.component.scss"],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("modal") modalRef: ElementRef = null;
  public modal: ModalInstance = null;
  public isRoot: boolean;
  public pending: boolean = false;
  constructor(
    private router: Router,
    public order: OrderService,
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.checkIsRoot();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkIsRoot();
      }
    });
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  checkIsRoot() {
    this.isRoot = this.router.url === "/order";
  }

  onFinishOrder() {
    this.modal.open();
  }

  onCloseModal() {
    this.order.clear();
    this.modal.close();
  }

  async onSubmitOrder() {
    const order: Order = { list: this.order.list };
    try {
      this.pending = true;
      const newOrder = await this.ordersService.create(order).toPromise();
      MaterialService.toast(`Order: ${newOrder._id} has been added`);
      this.order.clear();
      this.modal.close();
    } catch (error) {
      MaterialService.toast(error.error.message);
    } finally {
      this.pending = false;
    }
  }

  onRemovePosition(position: Position) {
    this.order.remove(position);
  }
}
