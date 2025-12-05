import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curso-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curso-banner.html',
  styleUrls: ['./curso-banner.css']
})
export class CursoBannerComponent {
  @Input() title: string = '';
  @Input() location: string = '';
  @Input() period: string = '';
  @Input() section: string = '';
}
