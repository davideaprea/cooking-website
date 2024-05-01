import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, OnDestroy, QueryList, inject } from '@angular/core';
import { InputLabel } from '../../models/base-form-input';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: FormGroupDirective,
      useFactory: () => inject(FormGroupDirective, { skipSelf: true })
    }
  ]
})
export class InputContainerComponent extends InputLabel implements AfterContentInit, OnDestroy {
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  readonly form: FormGroupDirective = inject(FormGroupDirective);
  private valueChangesSubscription!: Subscription;

  @ContentChildren(NgControl) content!: QueryList<NgControl>;
  errorMessage?: string;

  ngAfterContentInit(): void {
    this.valueChangesSubscription = this.control.valueChanges!.subscribe(() => {
      this.changeDetectorRef.markForCheck();

      const errors = this.control.errors;
      if (!errors) return;

      switch (Object.keys(errors)[0]) {
        case "required":
          this.errorMessage = "Please, fill this field.";
          break;

        case "min":
          this.errorMessage = `Values under ${errors["min"]["min"]} are not accepted.`;
          break;

        case "max":
          this.errorMessage = `Values above ${errors["max"]["max"]} are not accepted.`;
          break;

        case "minlength":
          this.errorMessage = `Lengths under ${errors["minlength"]["requiredLength"]} are not accepted.`;
          break;

        case "maxlength":
          this.errorMessage = `Lengths above ${errors["maxlength"]["requiredLength"]} are not accepted.`;
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
  }

  get control() {
    return this.content.get(0)!;
  }
}
