import { AfterViewInit, Component, ElementRef, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { Dropdown, DROPDOWN_DIRECTIVE } from 'src/app/tokens/dropdown.token';

@Component({
  selector: 'app-dropdown-box',
  templateUrl: './dropdown-box.component.html',
  styleUrls: ['./dropdown-box.component.scss']
})
export class DropdownBoxComponent implements AfterViewInit {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(@Inject(DROPDOWN_DIRECTIVE) readonly directive: Dropdown,
              @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>) {
  }

  ngAfterViewInit(): void {
    this.container.createEmbeddedView(this.directive.content);
    this.calculatePositionAndSize();
  }

  private calculatePositionAndSize() {
    const {clientRect} = this.directive;
    const {style} = this.elementRef.nativeElement;
    const hostRect = this.directive.dropdownHost;

    style.position = 'absolute';
    style.top = clientRect.y + clientRect.height + 5 + 'px';
    style.left = clientRect.x + 'px';
  }

}
