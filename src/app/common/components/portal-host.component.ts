import { Component, ComponentFactory, ComponentRef, Inject, Injector, ViewContainerRef } from '@angular/core';
import { PortalService } from 'src/app/services/portal.service';

@Component({
  selector: 'portal-host',
  template: ``
})
export class PortalHostComponent {

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        @Inject(PortalService) portalService: PortalService)
        {
            portalService.attach(this);
        }

        addComponentChild<C>(componentFactory: ComponentFactory<C>, injector: Injector): ComponentRef<C>{
            return this.viewContainerRef.createComponent(
                componentFactory, 
                undefined, 
                Injector.create({
                    parent: injector,
                    providers: [
                        {
                            provide: PortalHostComponent,
                            useValue: this,
                        },
                    ],
                }),);
        }
}