import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    console.log('environments here1: ', process.env.FBS_API_KEY);
    console.log('environments here2: ', process.env);
    console.log('environments here4: ', environment);
    console.log('environments here5: ', environment.firebase);
  }

}
