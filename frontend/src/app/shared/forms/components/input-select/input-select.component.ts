import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputSelectComponent,
      multi: true
    }
  ]
})
export class InputSelectComponent<T> implements ControlValueAccessor {
  value?: T;
  @Input({ required: true }) options!: T[];
  onChange!: (value: T) => void;
  onTouched!: () => void;
  private _open: boolean = false;
  private disabled: boolean = false;

  get open(): boolean {
    return this._open;
  }

  toggleSelect(event: Event): void {
    event.stopPropagation();
    this._open = !this._open;
  }

  setValue(event: Event, value: T): void {
    if(this.disabled) return;
    event.stopPropagation();
    this.value = value;
    this._open = false;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
