import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-project-tile',
  templateUrl: './project-tile.component.html',
  styleUrls: [
    '../../../assets/styles/entity-tile.css',
    './project-tile.component.css'
  ]
})
export class ProjectTileComponent implements OnInit {

  constructor(
    public authService: AuthService,
  ) { }

  @Input() item: any;

  isCompany = true;

  ngOnInit() {
  }

}
