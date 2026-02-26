import {Component, EventEmitter, HostListener, Output} from '@angular/core';
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

  onBackdropClick() {
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.close.emit();
  }
}
