import { Injectable, ElementRef } from "@angular/core";
import * as M from "materialize-css";

// declare var M;

export interface ModalInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export interface MaterialDatePicker extends ModalInstance {
  date?: Date;
}

@Injectable()
export class MaterialService {
  static initModal(modalRef: ElementRef): ModalInstance {
    return M.Modal.init(modalRef.nativeElement);
  }
  static toast(message: string): void {
    M.toast({ html: message });
  }

  static initializeFloatingButton(ref: ElementRef): void {
    M.FloatingActionButton.init(ref.nativeElement);
  }

  static updateTextInputs(): void {
    M.updateTextFields();
  }

  static initTooltip(ref: ElementRef): ModalInstance {
    return M.Tooltip.init(ref.nativeElement);
  }

  static initTapTarget(ref: ElementRef): ModalInstance {
    return M.TapTarget.init(ref.nativeElement);
  }

  static initDatePicker(
    ref: ElementRef,
    onClose: () => void
  ): MaterialDatePicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: "dd.mm.yyyy",
      showClearBtn: true,
      onClose
    });
  }
}
