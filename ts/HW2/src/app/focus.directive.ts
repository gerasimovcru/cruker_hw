import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[focus]"
})


export class FocusDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
  }

  @HostListener("mouseenter") onMouseEnter(): void {
    this.focus("#FD2929FF");
  }
  @HostListener("mouseleave") onMouseLeave(): void {
    this.focus("orange");
  }

  private focus (focus: string): void {
    this.renderer.setStyle(this.element.nativeElement, "background", focus );
  }
}
