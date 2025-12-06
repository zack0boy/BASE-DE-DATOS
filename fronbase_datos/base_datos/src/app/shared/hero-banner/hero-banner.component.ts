import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-banner">
      <div class="hero-inner" [ngStyle]="{ 'background': bgGradient }">
        <div class="hero-title">{{ title }}</div>
        <div *ngIf="subtitle" class="hero-subtitle">{{ subtitle }}</div>
      </div>
    </div>
  `,
  styles: [
    `.hero-banner{margin:1rem 0 1.5rem 0;border-radius:8px;overflow:hidden}.hero-inner{padding:30px 16px;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100px}.hero-title{color:#fff;font-size:22px;font-weight:700;text-align:center}.hero-subtitle{color:rgba(255,255,255,0.9);margin-top:6px}`
  ]
})
export class HeroBannerComponent {
  @Input() title: string = '';
  @Input() subtitle: string | null = null;
  @Input() bgGradient: string = 'linear-gradient(90deg,#6f42c1 0%,#8e44d3 40%,#a245d8 100%)';
}
