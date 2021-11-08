import { ComponentFactory, ComponentRef, Injectable, Injector } from "@angular/core";
import { PortalHostComponent } from "../common/components/portal-host.component";

const NO_HOST = 'Portals cannot be used without RootComponent';

@Injectable({
    providedIn: 'root',
})
export class PortalService {
    
    private host?: PortalHostComponent;

    private get safeHost(): PortalHostComponent {
        if (!this.host) {
            throw new Error(NO_HOST);
        }
        return this.host;
    }

    attach(host: PortalHostComponent) {
        this.host = host;
    }

    add<C>(componentFactory: ComponentFactory<C>, injector: Injector): ComponentRef<C> {
        return this.safeHost.addComponentChild(componentFactory, injector);
    }

    remove<C>({hostView}: ComponentRef<C>) {
        hostView.destroy();
    }
}