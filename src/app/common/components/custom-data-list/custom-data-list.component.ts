import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-data-list',
  templateUrl: './custom-data-list.component.html',
  styleUrls: ['./custom-data-list.component.scss']
})
export class CustomDataListComponent {
  @Input('elements') elements: string[];
}
