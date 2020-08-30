import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logged-in-root',
  templateUrl: './logged-in-root.component.html',
  styleUrls: ['./logged-in-root.component.css']
})
export class LoggedInRootComponent implements OnInit {

  constructor(
    public authService: AuthService,
  ) { }

  get canShowContent(): boolean {
    return this.authService.isAdmin !== undefined;
  }

  ngOnInit() {
  }

}
