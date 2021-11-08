import { ChangeDetectorRef, Component, ElementRef, Inject, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-hosted-dropdown',
  templateUrl: './hosted-dropdown.component.html',
  styleUrls: ['./hosted-dropdown.component.scss'],
})
export class HostedDropdownComponent {

  @Input() open = false;

  @Input()
  content: TemplateRef<any>;

  get host(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  constructor(readonly cd: ChangeDetectorRef,
    @Inject(ElementRef) private readonly elementRef: ElementRef){

  }

  onActiveZone(active: boolean) {
    //console.log(active);
    this.open = active;
    this.cd.detectChanges();
  }
}
