import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-admin-manage-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-manage-filter.component.html',
  styleUrls: ['./admin-manage-filter.component.css']
})
export class AdminManageFilterComponent {
  @Input() asignaturas: any[] = [];
  @Input() initial: any = null;
  @Output() change = new EventEmitter<any>();

  q: string = '';
  rut: string = '';
  asignaturaId: any = '';
  private change$ = new Subject<any>();

  ngOnInit() {
    if (this.initial) {
      this.q = this.initial.q || '';
      this.rut = this.initial.rut || '';
      this.asignaturaId = this.initial.asignaturaId || '';
    }
    // debounce user input to avoid flooding parent with events
    this.change$.pipe(
      debounceTime(300),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    ).subscribe(val => this.change.emit(val));
  }

  emitChange() { this.change$.next({ q: this.q, rut: this.rut, asignaturaId: this.asignaturaId }); }
  apply() { this.change.emit({ q: this.q, rut: this.rut, asignaturaId: this.asignaturaId }); }
  clear() { this.q=''; this.rut=''; this.asignaturaId=''; this.change.emit({ q: this.q, rut: this.rut, asignaturaId: this.asignaturaId }); }
}
