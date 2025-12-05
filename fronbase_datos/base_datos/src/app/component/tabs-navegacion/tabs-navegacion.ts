import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-tabs-navegacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs-navegacion.html',
  styleUrl: './tabs-navegacion.css'
})
export class TabsNavegacionComponent {
  @Input() tabs: Tab[] = [];
  @Input() activeTabId: string = '';
  @Output() tabSelected = new EventEmitter<string>();

  onTabClick(tabId: string): void {
    this.tabSelected.emit(tabId);
  }
}

