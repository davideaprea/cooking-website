import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Injector, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, inject } from '@angular/core';
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
  private readonly renderer: Renderer2 = inject(Renderer2);

  private _options: string[] = [];
  private options$!: BehaviorSubject<string[]>;

  @ViewChildren("option") optionItems!: QueryList<ElementRef<HTMLLIElement>>;
  @ViewChild("input") input!: ElementRef<HTMLInputElement>;
  value: string = "";
  optionsObs$!: Observable<string[]>;

  @Input({ required: true }) set options(options: string[]) {
    this._options = options;
    this.options$ = new BehaviorSubject(options);
    this.optionsObs$ = this.options$.pipe(debounceTime(300));
  };

  get options() {
    return this._options;
  }

  readonly angleDownIcon = faAngleDown;

  ngOnInit(): void {
    this.injector.get(NgControl).control!.addValidators(
      (control: AbstractControl): ValidationErrors | null => {
        const valid = this._options.includes(control.value);
        return valid ? null : { invalidValue: { value: control.value } };
      }
    );
  }

  override onClose(): void {
    this.input.nativeElement.blur();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.open) return;

    const index: number = this.options.indexOf(this.value);

    if (event.key === 'ArrowDown') {
      const selectedIndex: number = index + 1;
      //this.renderer.removeClass(this.optionItems.get(selectedIndex - 1)?.nativeElement, "focus");

      this.optionItems.get(selectedIndex)?.nativeElement.focus();
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
    this.close();
    this.onChange(value);
    this.onTouched();
  }
}
