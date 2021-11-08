import { Component, ContentChild, TemplateRef } from '@angular/core';
import { DataListDirective } from '../data-list/data-list.directive';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @ContentChild(DataListDirective, {read: TemplateRef})
  readonly datalist: TemplateRef<any>;


}