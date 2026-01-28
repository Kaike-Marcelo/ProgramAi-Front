import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SelectOption {
  id: string | number;
  name: string;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [],
  templateUrl: './custom-select.html',
})
export class CustomSelect {
  @Input() groups: SelectGroup[] = [];
  @Input() selectedId: string | number | null = null;
  @Input() placeholder: string = 'Selecione uma opção';

  @Output() selectionChange = new EventEmitter<string | number>();

  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  select(option: SelectOption) {
    this.selectionChange.emit(option.id);
    this.isOpen = false;
  }

  get selectedLabel(): string {
    for (const group of this.groups) {
      const found = group.options.find(opt => opt.id === this.selectedId);
      if (found) {
        return found.name;
      }
    }
    return this.placeholder;
  }
}
