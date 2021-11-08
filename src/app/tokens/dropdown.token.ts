import { InjectionToken, TemplateRef } from "@angular/core";
import { ActiveZoneDirective } from "../directives/active-zone.directive";

export const DROPDOWN_DIRECTIVE = new InjectionToken<Dropdown>(
    'Directive controlling DropdownBoxComponent',
);

export interface Dropdown<C = object> {
    content: TemplateRef<any>;
    activeZone: ActiveZoneDirective | null;
    clientRect: DOMRect;
    dropdownHost: HTMLElement | null;
}
