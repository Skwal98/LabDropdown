import { Directive, ElementRef, Inject, Input, OnDestroy, Optional, Output, SkipSelf } from "@angular/core";
import { Observable } from "rxjs";
import { distinctUntilChanged, map, skip, startWith, tap } from "rxjs/operators";
import { ACTIVE_ELEMENT } from "../services/active-element.service";

@Directive({
  selector: '[activeZone],[activeZoneChange],[activeZoneParent]',
  exportAs: 'activeZone'
})
export class ActiveZoneDirective implements OnDestroy {
  private subActiveZones: ReadonlyArray<ActiveZoneDirective> = [];
  private activeZoneParent: ActiveZoneDirective | null = null;

  @Input('activeZoneParent')
  set activeZoneParentSetter(zone: ActiveZoneDirective | null) {
        if (this.activeZoneParent) {
            this.activeZoneParent.removeSubActiveZone(this);
        }

        if (zone) {
            zone.addSubActiveZone(this);
        }

        this.activeZoneParent = zone;
      //  console.log(zone);
    }

  @Output()
  readonly activeZoneChange = this.active$.pipe(
    tap(x=> {
     // console.log(this.subActiveZones),
      //console.log(x);
      return x;
    }),
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
    this.parent?.addSubActiveZone(this);
  }

  ngOnDestroy() {
    this.parent?.removeSubActiveZone(this);
    this.activeZoneParent?.removeSubActiveZone(this);
  }

  contains(node: Node): boolean {
    return (
      this.elementRef.nativeElement.contains(node) ||
      this.subActiveZones.some(
        (item, index, array) =>
            array.indexOf(item) === index && item.contains(node),
      )
    );
  }

  private addSubActiveZone(activeZone: ActiveZoneDirective) {
    this.subActiveZones = [...this.subActiveZones, activeZone];
  }

  private removeSubActiveZone(activeZone: ActiveZoneDirective) {
    const index = this.subActiveZones.findIndex(item => item === activeZone);

    this.subActiveZones = [
        ...this.subActiveZones.slice(0, index),
        ...this.subActiveZones.slice(index + 1),
    ];
}
}