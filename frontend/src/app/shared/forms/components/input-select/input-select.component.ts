import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Openable } from '../../models/openable';
import { ElementBlurDirective } from 'src/app/shared/directives/element-blur.directive';

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
    },
    {
      provide: Openable,
      useExisting: InputSelectComponent
    }
  ],
  hostDirectives: [ElementBlurDirective]
})
export class InputSelectComponent<T> extends Openable implements ControlValueAccessor {
  value?: T;
  @Input({ required: true }) options!: T[];
  onChange!: (value: T) => void;
  onTouched!: () => void;
  private disabled: boolean = false;

  toggleSelect(event: Event): void {
    event.stopPropagation();
    this.open = !this.open;
  }

  constructor() {
    super();
    /* setInterval(() => console.log(this.open), 1000) */
  }

  override close(): void {
    this.open = false;
  }

  setValue(event: Event, value: T): void {
    if (this.disabled) return;
    event.stopPropagation();
    this.value = value;
    this.open = false;
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
