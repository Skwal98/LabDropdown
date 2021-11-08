import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit{

  values: string[];

  constructor(public cd: ChangeDetectorRef) {
  }
  ngAfterContentInit(): void {
    this.values =  [
      'An item',
      'A second item',
      'A third item',
      'A fourth item',
    ];
  }

  ngOnInit(): void {
    this.cd.detectChanges();
  }
}
