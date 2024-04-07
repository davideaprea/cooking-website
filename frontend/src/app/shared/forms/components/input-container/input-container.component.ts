import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Input, OnInit, QueryList } from '@angular/core';
import { InputLabel } from '../../models/base-form-input';
import { AbstractControlDirective, FormControl, FormControlDirective } from '@angular/forms';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputContainerComponent extends InputLabel implements AfterContentInit{
  @ContentChildren(FormControlDirective) content!: QueryList<FormControlDirective>;
  @Input() errorMessage?: string;

  ngAfterContentInit(): void {
    //if(this.content.length != 1) throw Error("An input element must be provided.");
  }

  get control() {
    return this.content.get(0)!;
  }
}
