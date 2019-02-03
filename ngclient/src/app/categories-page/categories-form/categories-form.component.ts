import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Category } from "src/app/shared/interfaces/category";
import { CategoriesService } from "src/app/shared/service/categories.service";
import { MaterialService } from "src/app/shared/service/material.service";

@Component({
  selector: "app-categories-form",
  templateUrl: "./categories-form.component.html",
  styleUrls: ["./categories-form.component.scss"]
})
export class CategoriesFormComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoriesService
  ) {}

  @ViewChild("input") inputRef: ElementRef;
  private isNew: boolean = true;
  public form: FormGroup;
  public image: File;
  public imagePreview: any;
  public category: Category = null;

  async ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
    const { id } = await this.route.snapshot.params;
    if (!!id) {
      this.isNew = false;
      this.category = await this.getById(id);
      this.form.patchValue({ name: this.category.name });
      this.imagePreview = this.category.imageSrc;
      MaterialService.updateTextInputs();
    }
  }

  async getById(id: string): Promise<Category> {
    this.form.disable();
    try {
      const category: Category = await this.categoryService
        .getById(id)
        .toPromise();
      return category;
    } catch (error) {
      MaterialService.toast(error.error.message);
    } finally {
      this.form.enable();
    }
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: Event) {
    const file = (<HTMLInputElement>event.target).files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  async onSubmit() {
    this.form.disable();
    let result: Category = null;
    const formName = this.form.value.name;
    try {
      result = this.isNew
        ? await this.categoryService.create(formName, this.image).toPromise()
        : await this.categoryService
            .update(this.category._id, formName, this.image)
            .toPromise();
      this.form.enable();
      MaterialService.toast("Successfully saved");
      this.router.navigate(["/categories"]);
    } catch (error) {
      this.form.enable();
      MaterialService.toast(error.error.message);
    }
  }

  async onDeleteCategory() {
    const result = confirm(
      `Are you sure you want to delete "${this.category.name}" category`
    );
    if (!result) return;

    try {
      await this.categoryService.delete(this.category._id).toPromise();
      MaterialService.toast("Successfully deleted");
      this.router.navigate(["/categories"]);
    } catch (error) {
      MaterialService.toast(error.error.message);
    }
  }
}
