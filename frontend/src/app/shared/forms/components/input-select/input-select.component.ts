import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Injector, Input, OnInit, QueryList, ViewChildren, inject } from '@angular/core';
import { AbstractControl, ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR, NgControl, ValidationErrors } from '@angular/forms';
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
export class InputSelectComponent extends blurrable(DefaultValueAccessor) implements ControlValueAccessor, OnInit {
  private readonly injector: Injector = inject(Injector);
  @ViewChildren("option") optionItems!: QueryList<ElementRef<HTMLLIElement>>;

  private _options: string[] = [];
  private options$!: BehaviorSubject<string[]>;

  value: string = "";
  optionsObs$!: Observable<string[]>;

  @Input() label?: string;
  @Input() id?: string;
  @Input({ required: true }) set options(options: string[]) {
    this._options = options;
    this.options$ = new BehaviorSubject(options);
    this.optionsObs$ = this.options$.pipe(debounceTime(300));
  };

  readonly angleDownIcon = faAngleDown;

  ngOnInit(): void {
    this.injector.get(NgControl).control!.addValidators(
      (control: AbstractControl): ValidationErrors | null => {
        const valid = this._options.includes(control.value);
        return valid ? null : { invalidValue: { value: control.value } };
      }
    );
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.open) return;

    if(event.key === 'ArrowDown') {
      const index = this.optionItems.find(item => item.nativeElement)
    }
  }

  toggleSelect(event: Event): void {
    event.stopPropagation();
    this.open = !this.open;
  }

  filterOptions(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    const results = this._options.filter(option => {
      const lowerCaseOption = option.toLowerCase();
      const lowerCaseValue = value.toLowerCase();
      return lowerCaseOption.startsWith(lowerCaseValue);
    });
    this.options$.next(results);
  }

  setValue(event: Event, value: string): void {
    event.stopPropagation();
    this.value = value;
    this.open = false;
    this.onChange(value);
    this.onTouched();
  }
}
