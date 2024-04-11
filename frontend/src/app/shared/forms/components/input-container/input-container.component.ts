import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, QueryList, inject } from '@angular/core';
import { InputLabel } from '../../models/base-form-input';
import { FormControlDirective } from '@angular/forms';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputContainerComponent extends InputLabel implements AfterContentInit{
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  @ContentChildren(FormControlDirective) content!: QueryList<FormControlDirective>;
  @Input() errorMessage?: string;

  ngAfterContentInit(): void {
    this.control?.valueChanges?.subscribe(() => this.changeDetectorRef.markForCheck());
  }

  get control() {
    return this.content.get(0)!;
  }
}
