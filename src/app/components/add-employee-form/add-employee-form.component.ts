import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../classes/employee';
import { Constants } from '../../classes/constants';
import { SelectItem } from '../../interfaces/select-item';
import { SkillsDataService } from '../../services/skills-data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private skds: SkillsDataService,
  ) { }

  @Input() employee: Employee;
  @Input() submitBtnText: string;
  @Output() saveData = new EventEmitter<object>();

  employeeForm: FormGroup;
  telegramLinkPrefix = Constants.TELEGRAM_LINK_PREFIX;
  telegramNicknamePattern = { T: { pattern: new RegExp('\[a-z0-9_\]')} };

  get saveFormText(): string {
    return this.submitBtnText || 'Add employee';
  }

  get positions(): SelectItem[] {
    return this.skds.positions || [];
  }

  get skills(): string[] {
    return this.skds.getSkillsValuesList() || [];
  }

  addNewEmployee(): void {
    if (!this.employeeForm.invalid) {
      const formData = this.employeeForm.value;
      const data = this.employee.genEmployeeDataObject(formData);
      this.saveData.emit(data);
    }
  }

  updateAvatar(avatar): void {
    this.employee.userPhoto = avatar;
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      isActive: [this.employee.isActive],
      firstName: [this.employee.firstName, [Validators.required, Validators.maxLength(20)]],
      lastName: [this.employee.lastName, [Validators.required, Validators.maxLength(20)]],
      email: [this.employee.email, [Validators.required, Validators.email, Validators.maxLength(50)]],
      bio: [this.employee.bio, [Validators.maxLength(800)]],
      telegramLink: [this.employee.telegramLink, [Validators.minLength(5), Validators.maxLength(80)]],
      cvLink: [this.employee.cvLink, [Validators.maxLength(300)]],
      positionId: [this.employee.positionId, [Validators.required]],
      birthday: [this.employee.getBirthday(), [Validators.required]],
      firstday: [this.employee.getFirstday(), [Validators.required]],
    });
  }

}
