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
      MaxSizeValidator(this.maxSize * 1024),
      AcceptValidator(this.accept),
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
  isProgressActive = false;

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
    this.isProgressActive = true;
    this.exportedData = this.skds.exportUserSkillsData().subscribe((data) => {
      this.isProgressActive = false;
      const file = new Blob([JSON.stringify(data, null, 2)], {type : this.accept});
      this.downloadLink = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    });
  }

  importSkills() {
    this.skds.getFileData(this.files)
      .then((data) => {
        return this.skds.importUserSkillsData(data);
      })
      .then(() => {
        alert('Import success');
      })
      .catch((error) => {
        alert(error);
      });
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
    if (this.exportedData) {
      this.exportedData.unsubscribe();
    }
    if (this.fileData) {
      this.fileData.unsubscribe();
    }
  }

}
