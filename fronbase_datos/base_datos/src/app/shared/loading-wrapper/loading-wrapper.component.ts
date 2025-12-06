import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-loading-wrapper',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, ErrorMessageComponent],
  template: `
    <ng-container *ngIf="loading">
      <app-loading-spinner></app-loading-spinner>
    </ng-container>
    <ng-container *ngIf="!loading && error">
      <app-error-message [message]="error" [showReload]="true" (onReload)="reload.emit()"></app-error-message>
    </ng-container>
    <ng-container *ngIf="!loading && !error">
      <ng-content></ng-content>
    </ng-container>
  `
})
export class LoadingWrapperComponent {
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Output() reload = new EventEmitter<void>();
}
