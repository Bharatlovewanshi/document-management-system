import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() title: string = '';
  @Input() isOpen: boolean = false;

  @Output() close = new EventEmitter<void>();

  onBackdropClick(): void {
    this.close.emit();
  }
}
