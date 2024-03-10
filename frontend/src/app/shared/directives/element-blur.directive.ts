import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[elementBlur]'
})
export class ElementBlurDirective {
  @Output() private elementBlur = new EventEmitter<void>();

  constructor(private host: ElementRef<HTMLElement>) { }

  @HostListener('document:mousedown', ['$event'])
  handleMouseDown(event: Event): void {
    const target = event.target as HTMLElement;
    const host = this.host.nativeElement;
    if (host && !host.contains(target)) this.elementBlur.emit();
  }
}
