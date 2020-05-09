import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  constructor() { }

  avatarErrors = [];

  @Input() avatar: string;
  @Output() updated = new EventEmitter<string>();

  get backgroundImage() {
    return this.avatar ? {'background-image': `url(${this.avatar})`} : '';
  }

  catchUploadedFile(event: Event): void {
    if (this._isValidAvatar(event)) {
      this._convertAvatar(event).then((data: any) => {
        this.avatar = data.target.result;
        this.updated.emit(this.avatar);
      });
    }
  }

  private _convertAvatar(event: Event): Promise<any> {
    const file = this._getFile(event);
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = resolve;
      reader.readAsDataURL(file);
    });
  }

  private _getFile(event): any {
    return event.target && event.target.files && event.target.files.length ? event.target.files[0] : '';
  }

  private _isValidAvatar(event: Event): boolean {
    this.avatarErrors = [];

    const file = this._getFile(event);
    if (!file) {
      this.avatarErrors.push('File is not selected');
    }
    if (file.size > 5242880) {
      this.avatarErrors.push('Max file size is 5Mb');
    }
    if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
      this.avatarErrors.push('Incorrect file type. Only .png, .jpeg, .gif file types are allowed');
    }

    return !this.avatarErrors.length;
  }

  ngOnInit() {}

}
