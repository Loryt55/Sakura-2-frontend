import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();

  private mousedownOnBackdrop = false;

  onBackdropMousedown() {
    this.mousedownOnBackdrop = true;
  }

  onCardMousedown() {
    this.mousedownOnBackdrop = false;
  }

  onBackdropMouseup() {
    if (this.mousedownOnBackdrop) {
      this.close.emit();
    }
    this.mousedownOnBackdrop = false;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.close.emit();
  }
}
