import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataListComponent } from './common/components/data-list/data-list.component';
import { DataListDirective } from './common/components/data-list/data-list.directive';
import { DropdownBoxComponent } from './common/components/dropdown-box/dropdown-box.component';
import { HostedDropdownComponent } from './common/components/hosted-dropdown/hosted-dropdown.component';
import { PortalHostComponent } from './common/components/portal-host.component';
import { SelectComponent } from './common/components/select/select.component';
import { ActiveZoneDirective } from './directives/active-zone.directive';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    PortalHostComponent,
    SelectComponent,
    DataListComponent,
    HostedDropdownComponent,
    DropdownBoxComponent,
    DropdownDirective,
    DataListDirective,
    ActiveZoneDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DropdownBoxComponent]
})
export class AppModule { }
