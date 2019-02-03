import { Component, OnInit } from "@angular/core";
import { CategoriesService } from "../shared/service/categories.service";
import { MaterialService } from "../shared/service/material.service";
import { Category } from "../shared/interfaces/category";
import { LoaderComponent } from "../shared/components/loader/loader.component";

@Component({
  selector: "app-categories-page",
  templateUrl: "./categories-page.component.html",
  styleUrls: ["./categories-page.component.scss"]
})
export class CategoriesPageComponent implements OnInit {
  public categories: Category[] = null;

  constructor(private categoriesService: CategoriesService) {}

  async ngOnInit() {
    this.categories = await this.getCategories();
  }

  async getCategories() {
    try {
      LoaderComponent.showPreloader();
      const categories = await this.categoriesService.fetch().toPromise();
      LoaderComponent.hidePreloader();
      return categories;
    } catch (error) {
      LoaderComponent.hidePreloader();
      MaterialService.toast("Error fetching categories");
    }
  }
}
