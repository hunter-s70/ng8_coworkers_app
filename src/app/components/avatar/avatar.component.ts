import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @Input() avatar: string;
  @Input() isCompany: boolean;

  get backgroundAvatarImage() {
    return this.avatar ? {'background-image': `url(${this.avatar})`} : '';
  }

  ngOnInit() {}

}
