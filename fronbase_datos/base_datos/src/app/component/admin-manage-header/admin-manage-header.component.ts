import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-manage-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-manage-header.component.html',
  styleUrls: ['./admin-manage-header.component.css']
})
export class AdminManageHeaderComponent {
  @Input() title: string | null = null;
  @Input() asignaturas: any[] = [];
  @Input() selectedAsignatura: any = null;
  @Input() filtered: any[] = [];
  @Input() showDropdown: boolean = false;

  @Output() selectAsignatura = new EventEmitter<any>();
  @Output() clearAsignatura = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();

  searchTerm: string = '';

  onSearchChange() { this.searchChange.emit(this.searchTerm); }
  select(a: any) { this.selectAsignatura.emit(a); }
  clear() { this.clearAsignatura.emit(); this.searchTerm = ''; }
}
