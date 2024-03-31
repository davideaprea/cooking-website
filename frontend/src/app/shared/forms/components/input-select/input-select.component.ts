import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { blurrable } from 'src/app/shared/mixins/element-blur';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, debounceTime } from 'rxjs';

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
export class InputSelectComponent extends blurrable(Object) implements ControlValueAccessor {
  value?: string;
  private _options: string[] = [];
  private options$!: BehaviorSubject<string[]>;
  optionsObs$!: Observable<string[]>;
  @Input() label?: string;
  @Input() id?: string;
  onChange!: (value: string) => void;
  onTouched!: () => void;
  private disabled: boolean = false;
  @Input({ required: true }) set options(options: string[]) {
    this._options = options;
    this.options$ = new BehaviorSubject(options);
    this.optionsObs$ = this.options$.pipe(debounceTime(300));
  };

  readonly angleDownIcon = faAngleDown;

  toggleSelect(event: Event): void {
    event.stopPropagation();
    this.open = !this.open;
  }

  constructor() {
    super();
  }

  filterOptions(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const results = this._options.filter(option => {
      const lowerCaseOption = option.toLowerCase();
      const lowerCaseValue = value.toLowerCase();
      return lowerCaseOption.startsWith(lowerCaseValue);
    });
    this.options$.next(results);
  }

  setValue(event: Event, value: string): void {
    if (this.disabled) return;
    event.stopPropagation();
    this.value = value;
    this.open = false;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: string): void {
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
