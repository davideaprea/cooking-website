import { Time } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputTimeComponent,
      multi: true
    }
  ]
})
export class InputTimeComponent extends DefaultValueAccessor{
  @ViewChild("hours") hours!: ElementRef<HTMLInputElement>;
  @ViewChild("minutes") minutes!: ElementRef<HTMLInputElement>;
  value: Time | null = null;

  handleInput(inputType: "hours" | "minutes"): void {
    const input: HTMLInputElement = this[inputType].nativeElement;
    if (input.disabled) return;
    const valueAsNumber = Number(input.value);
    const limit = inputType == "hours" ? 23 : 59;
    if(valueAsNumber > limit) input.value = String(limit);
    else if(valueAsNumber < 0) input.value = String(0);

    if(!this.value) this.value = { hours: 0, minutes: 0 }
    this.value[inputType] = Number(input.value);

    this.onChange(this.value);
    this.onTouched();
  }
}
