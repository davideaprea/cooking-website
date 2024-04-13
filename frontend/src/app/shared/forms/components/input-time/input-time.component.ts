import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { Duration } from 'moment';

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
export class InputTimeComponent extends DefaultValueAccessor {
  @ViewChild("hours") hours!: ElementRef<HTMLInputElement>;
  @ViewChild("minutes") minutes!: ElementRef<HTMLInputElement>;
  private value: Duration = moment.duration({
    minutes: 0,
    hours: 0
  });

  handleInput(inputType: "hours" | "minutes", event: Event): void {
    event.stopPropagation();
    const input: HTMLInputElement = this[inputType].nativeElement;
    if (input.disabled) return;

    const timeUnit = inputType == "hours" ? "h" : "m";
    const limit = inputType == "hours" ? 23 : 59;

    const valueAsNumber = Number(input.value);
    if (valueAsNumber > limit) input.value = String(limit);
    else if (valueAsNumber < 0) input.value = String(0);

    this.value.subtract(this.value[inputType](), timeUnit);
    this.value.add(valueAsNumber, timeUnit);

    this.onChange(this.value);
    this.onTouched();
  }
}
