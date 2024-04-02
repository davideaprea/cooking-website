import { Directive, ElementRef, HostListener, inject } from '@angular/core';

export const blurrable = <T extends { new(...args: any[]): any }>(constructor: T) => {
  @Directive()
  abstract class ElementBlur extends constructor {
    protected open: boolean = false;
    protected host: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    @HostListener('document:mousedown', ['$event'])
    private handleMouseDown(event: Event): void {
      const target = event.target as HTMLElement;
      const host = this.host.nativeElement as HTMLElement;
      if (!host.contains(target)) this.open = false;
    }

    @HostListener('document:keydown.escape', ['$event'])
    private onEscape(event: KeyboardEvent) {
      if (this.open) this.open = false;
    }
  }

  return ElementBlur;
}
