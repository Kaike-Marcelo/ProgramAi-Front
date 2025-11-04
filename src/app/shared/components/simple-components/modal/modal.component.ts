import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() actions: { label: string; action: () => void }[] = [];

  @ViewChild('modalRef') modalRef!: ElementRef<HTMLDialogElement>;

open() {
  this.modalRef.nativeElement?.showModal();
}

close() {
  this.modalRef.nativeElement?.close();
}


  onAction(btn: { action: () => void }) {
    btn.action();
    this.close();
  }

}
