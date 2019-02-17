import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PositionService } from "src/app/shared/service/position.service";
import { Position } from "src/app/shared/interfaces/position";
import { MaterialService } from "src/app/shared/service/material.service";
import { LoaderComponent } from "src/app/shared/components/loader/loader.component";
import { PositionMenuItem } from "./ValueObjects/PositionMenuItem";
import { OrderService } from "../order.service";

@Component({
  selector: "app-order-positions",
  templateUrl: "./order-positions.component.html",
  styleUrls: ["./order-positions.component.scss"]
})
export class OrderPositionsComponent implements OnInit {
  public positions: PositionMenuItem[] = null;

  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionService,
    private order: OrderService
  ) {}

  async ngOnInit() {
    const { id: categoryId } = this.route.snapshot.params;
    try {
      LoaderComponent.showPreloader();
      const positions: Position[] = await this.positionsService
        .fetch(categoryId)
        .toPromise();
      this.positions = positions.map(
        (position: Position) => new PositionMenuItem(position)
      );
    } catch (error) {
      MaterialService.toast(error.error.message);
    } finally {
      LoaderComponent.hidePreloader();
    }
  }

  onAddToOrder(position: Position) {
    this.order.add(position);
  }
}
