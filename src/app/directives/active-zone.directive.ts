import { Directive, ElementRef, Inject, OnDestroy, Optional, Output, SkipSelf } from "@angular/core";
import { Observable } from "rxjs";
import { distinctUntilChanged, map, skip, startWith } from "rxjs/operators";
import { ACTIVE_ELEMENT } from "../services/active-element.service";

@Directive({
  selector: '[activeZone],[activeZoneChange]'
})
export class ActiveZoneDirective implements OnDestroy {
  private children: readonly ActiveZoneDirective[] = [];

  @Output()
  readonly activeZoneChange = this.active$.pipe(
    map(element => this.contains(element)),
    startWith(false),
    distinctUntilChanged(),
    skip(1),
  );

  constructor(
    @Inject(ACTIVE_ELEMENT)
    private readonly active$: Observable<Element>,
    private readonly elementRef: ElementRef<Element>,
    @Optional()
    @SkipSelf()
    private readonly parent: ActiveZoneDirective | null,
  ) {
    this.parent?.addChild(this);
  }

  ngOnDestroy() {
    this.parent?.removeChild(this);
  }

  contains(node: Node): boolean {
    return (
      this.elementRef.nativeElement.contains(node) ||
      this.children.some(item => item.contains(node))
    );
  }

  private addChild(activeZone: ActiveZoneDirective) {
    this.children = this.children.concat(activeZone);
  }

  private removeChild(activeZone: ActiveZoneDirective) {
    this.children = this.children.filter(item => item !== activeZone);
  }
}