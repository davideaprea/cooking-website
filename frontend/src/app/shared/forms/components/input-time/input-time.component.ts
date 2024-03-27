import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTimeComponent {
  @ViewChild("hours") hoursInput!: ElementRef<HTMLSpanElement>;
  @ViewChild("minutes") minutesInput!: ElementRef<HTMLSpanElement>;

  handleHoursInput(event: Event): void {
    const value: string = this.hoursInput.nativeElement.innerText;
    const valueAsNumber = Number(value);
    console.log(value)
    if(this.isInputValueNotNumber(event) || valueAsNumber > 24 || valueAsNumber <= 0) {
      this.hoursInput.nativeElement.innerHTML = value.slice(0, -1);
    }
  }

  private isInputValueNotNumber(event: Event): boolean {
    const inputEvent = event as InputEvent;
    const value = Number(inputEvent.data);
    return isNaN(value);
  }
}
