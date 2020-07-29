import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { SelectItem } from '../../interfaces/select-item';
import { SkillsDataService } from '../../services/skills-data.service';

@Component({
  selector: 'app-skills-manager',
  templateUrl: './skills-manager.component.html',
  styleUrls: ['./skills-manager.component.css']
})
export class SkillsManagerComponent implements OnInit, OnDestroy {

  constructor(
    private sanitizer: DomSanitizer,
    private skds: SkillsDataService,
  ) {
    this.fileControl = new FormControl(this.files, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ]);
  }

  public files;
  color: ThemePalette = 'primary';
  disabled = false;
  multiple = false;
  accept = 'application/json';
  maxSize = 16;
  fileControl: FormControl;
  fileData: Subscription;

  downloadLink: SafeUrl;
  exportedData: Subscription;

  get positions(): SelectItem[] {
    return this.skds.positions || [];
  }

  get skills(): SelectItem[] {
    return this.skds.skills || [];
  }

  get exportedFileUrl(): any {
    return this.downloadLink || '';
  }

  exportSkills() {
    this.exportedData = this.skds.exportUserSkillsData().subscribe((data) => {
      const file = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
      this.downloadLink = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    });
  }

  importSkills() {
    console.log('import');
    console.log(this.fileControl);
    console.log(this.files);
  }

  ngOnInit() {
    this.fileData = this.fileControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
    });
  }

  ngOnDestroy() {
    this.exportedData.unsubscribe();
    this.fileData.unsubscribe();
  }

}
