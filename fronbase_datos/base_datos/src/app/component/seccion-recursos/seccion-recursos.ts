import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccion-recursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-recursos.html',
  styleUrls: ['./seccion-recursos.css']
})
export class SeccionRecursosComponent {
  @Input() recursos: any[] = [];
}
