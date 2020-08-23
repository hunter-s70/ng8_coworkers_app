import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.css']
})
export class EntitiesListComponent implements OnInit {

  constructor() { }

  @Input() itemsList: any[];

  ngOnInit() {
  }

}
