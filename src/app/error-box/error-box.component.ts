import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.css'],
})
export class ErrorBoxComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  @Input() errorMessage: string;

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.closeEvent.emit();
  }
}
