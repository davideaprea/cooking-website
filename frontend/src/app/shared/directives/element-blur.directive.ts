import { Directive, ElementRef, HostListener } from '@angular/core';
import { Openable } from '../forms/models/openable';

@Directive({
  selector: '[elementBlur]',
  standalone: true
})
export class ElementBlurDirective {
  constructor(private openableInstance: Openable, private elementRef: ElementRef<HTMLElement>) { }

  @HostListener('document:mousedown', ['$event'])
  handleMouseDown(event: Event): void {
    const target = event.target as HTMLElement;
    const host = this.elementRef.nativeElement as HTMLElement;
    if (host && !host.contains(target)) this.openableInstance.open = false;
  }
}
