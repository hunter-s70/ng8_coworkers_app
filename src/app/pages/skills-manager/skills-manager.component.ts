import { Component, OnInit, OnDestroy } from '@angular/core';
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
  ) { }

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

  ngOnInit() {
  }

  ngOnDestroy() {
    this.exportedData.unsubscribe();
  }

}
