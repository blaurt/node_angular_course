import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { PositionService } from "src/app/shared/service/position.service";
import {
  MaterialService,
  ModalInstance
} from "src/app/shared/service/material.service";
import { LoaderComponent } from "src/app/shared/components/loader/loader.component";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Position } from "src/app/shared/interfaces/position";
import { Router } from "@angular/router";

@Component({
  selector: "app-positions-form",
  templateUrl: "./positions-form.component.html",
  styleUrls: ["./positions-form.component.scss"]
})
export class PositionsFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input("categoryId") categoryId: string;
  @ViewChild("modal") modalRef: ElementRef;
  public positions: Position[] = [];
  public modal: ModalInstance;
  public form: FormGroup;
  public currentPositionId: string = null;
  constructor(
    private positionsService: PositionService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    });

    LoaderComponent.showPreloader();
    try {
      this.positions = await this.positionsService
        .fetch(this.categoryId)
        .toPromise();
    } catch (error) {
      MaterialService.toast(error.error.message);
    } finally {
      LoaderComponent.hidePreloader();
    }
  }

  async ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  onSelectPosition(position: Position): void {
    this.form.patchValue({ ...position });
    MaterialService.updateTextInputs();
    this.modal.open();
    this.currentPositionId = position._id;
  }

  onAddPosition() {
    this.currentPositionId = null;
    this.form.reset();
    this.modal.open();
  }

  onCancel() {
    this.modal.close();
  }

  async onDeletePosition(event: Event, position: Position): Promise<void> {
    event.stopPropagation();
    const result = confirm("Are you sure, you want to delete the position?");
    if (!result) return;
    try {
      await this.positionsService.delete(position._id).toPromise();
      this.positions = await this.positionsService
        .fetch(this.categoryId)
        .toPromise();
      MaterialService.toast("Successfully deleted");
    } catch (error) {
      MaterialService.toast(error.error.message);
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.form.disable();

    const position: Position = {
      categoryId: this.categoryId,
      name: this.form.get("name").value,
      cost: this.form.get("cost").value
    };

    try {
      !!this.currentPositionId
        ? await this.positionsService
            .update(this.currentPositionId, position)
            .toPromise()
        : await this.positionsService.create(position).toPromise();
      this.positions = await this.positionsService
        .fetch(this.categoryId)
        .toPromise();
      MaterialService.toast("Successfully saved");
    } catch (error) {
      MaterialService.toast(error.error.message);
    } finally {
      this.form.enable();
      this.modal.close();
      this.form.reset();
    }
  }
}
