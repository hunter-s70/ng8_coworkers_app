import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent implements OnInit {

  constructor() { }

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemInputCtrl = new FormControl();
  filteredItems: Observable<string[]>;

  @Input() items: string[];
  @Input() selectedItems: string[];
  @Input() placeholderText: string;

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  addItem(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add tag
      if ((value || '').trim() && !this._isSelctedItem(value)) {
        this.selectedItems.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.itemInputCtrl.setValue(null);
    }
  }

  removeItem(item: string): void {
    const index = this.selectedItems.indexOf(item);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
  }

  selectItem(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;

    if (!this._isSelctedItem(value)) {
      this.selectedItems.push(value);
    }
    this.tagInput.nativeElement.value = '';
    this.itemInputCtrl.setValue(null);
  }

  private _isSelctedItem(value: string): boolean {
    return !!this.selectedItems.find(item => item.toLowerCase() === (value || '').trim().toLowerCase());
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.items.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.filteredItems = this.itemInputCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => item ? this._filter(item) : this.items.slice()));
  }

}
