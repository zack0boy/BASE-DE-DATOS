import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.css']
})
export class AutocompleteInputComponent implements OnInit {
  @Input() placeholder: string = 'Escribe y selecciona';
  @Input() options: string[] = [];
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() select = new EventEmitter<string>();

  inputValue: string = '';
  filteredOptions: string[] = [];
  showDropdown: boolean = false;
  selectedIndex: number = -1;

  ngOnInit() {
    this.inputValue = this.value;
  }

  onInput() {
    const query = this.inputValue.toLowerCase().trim();
    if (query.length === 0) {
      this.filteredOptions = this.options;
    } else {
      this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(query));
    }
    this.selectedIndex = -1;
    this.showDropdown = this.filteredOptions.length > 0;
    this.valueChange.emit(this.inputValue);
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.selectedIndex < this.filteredOptions.length - 1) {
        this.selectedIndex++;
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.selectedIndex >= 0 && this.selectedIndex < this.filteredOptions.length) {
        this.selectOption(this.filteredOptions[this.selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      this.showDropdown = false;
    }
  }

  selectOption(opt: string) {
    this.inputValue = opt;
    this.showDropdown = false;
    this.select.emit(opt);
    this.valueChange.emit(opt);
  }

  onBlur() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 150);
  }
}
