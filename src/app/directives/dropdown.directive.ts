import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  forwardRef,
  Inject,
  Injector,
  Input,
  Optional,
  TemplateRef,
} from '@angular/core';
import { DropdownBoxComponent } from '../common/components/dropdown-box/dropdown-box.component';
import { PortalService } from '../services/portal.service';
import { DROPDOWN_DIRECTIVE } from '../tokens/dropdown.token';
import { ActiveZoneDirective } from './active-zone.directive';

@Directive({
  selector: '[dropdown]',
  providers: [
    {
      provide: DROPDOWN_DIRECTIVE,
      useExisting: forwardRef(() => DropdownDirective),
    },
  ],
})
export class DropdownDirective {
  @Input('dropdown')
  set open(value: boolean) {
    if (value) {
      this.openDropdownBox();
    } else {
      this.closeDropdownBox();
    }
  }

  @Input('dropdownContent') content: TemplateRef<any>;
  @Input('dropdownHost') dropdownHost: HTMLElement | null = null;

  dropdownBoxRef: ComponentRef<DropdownBoxComponent> | null = null;

  get clientRect(): DOMRect {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  constructor(
    @Inject(ComponentFactoryResolver)
    readonly componentFactoryResolver: ComponentFactoryResolver,
    @Inject(Injector) readonly injector: Injector,
    @Inject(ElementRef) readonly elementRef: ElementRef<HTMLElement>,
    @Inject(PortalService) readonly portalService: PortalService,
    @Inject(ActiveZoneDirective)
    @Optional()
    readonly activeZone: ActiveZoneDirective | null,
    readonly cd: ChangeDetectorRef
  ) {
  }

  private openDropdownBox() {
    if (this.dropdownBoxRef !== null) {
      return;
    }

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        DropdownBoxComponent
      );

    this.dropdownBoxRef = this.portalService.add(
      componentFactory,
      this.injector
    );
    this.dropdownBoxRef.changeDetectorRef.detectChanges();
    this.cd.detectChanges();
  }

  private closeDropdownBox() {
    if (this.dropdownBoxRef === null) {
      return;
    }

    this.portalService.remove(this.dropdownBoxRef);
    this.dropdownBoxRef = null;
  }
}
