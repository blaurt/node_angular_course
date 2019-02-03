import { Injectable, ElementRef } from "@angular/core";
import * as M from "materialize-css";

// declare var M;

export interface ModalInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
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
}
