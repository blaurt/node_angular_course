import { Component, OnInit } from "@angular/core";
import { CategoriesService } from "src/app/shared/service/categories.service";
import { Category } from "src/app/shared/interfaces/category";
import { MaterialService } from "src/app/shared/service/material.service";
import { LoaderComponent } from "src/app/shared/components/loader/loader.component";

@Component({
  selector: "app-order-categories",
  templateUrl: "./order-categories.component.html",
  styleUrls: ["./order-categories.component.scss"]
})
export class OrderCategoriesComponent implements OnInit {
  public categories: Category[] = null;
  constructor(private categoriesService: CategoriesService) {}

  async ngOnInit() {
    try {
      LoaderComponent.showPreloader();
      this.categories = await this.categoriesService.fetch().toPromise();
    } catch (error) {
      MaterialService.toast(error.error.message);
    } finally {
      LoaderComponent.hidePreloader();
    }
  }
}
