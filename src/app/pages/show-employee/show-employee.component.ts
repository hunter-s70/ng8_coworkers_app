import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../../classes/employee';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit, OnDestroy {

  constructor(
    private ems: EmployeeService,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  employee: Employee;
  employeeId: string;
  employeeData: Subscription;
  employeeExists = true;

  get fullName(): string {
    return this.employee ? `${this.employee.firstName} ${this.employee.lastName}` : '';
  }

  get dataList(): any[] {
    const employeeData = this.employee || {};
    console.log(this.employee.skillsList.join('; '));
    return [
      {
        title: 'Position',
        data: this.ems.getPositionNameById(this.employee.positionId),
      },
      {
        title: 'Skills',
        class: 'show-employee__data--skills',
        data: this.employee.skillsList.map(item => `<span class="skill-clip">${item}</span>`).join(''),
      },
      {
        title: 'Email',
        data: this.employee.email,
      },
      {
        title: 'Telegram link',
        data: this.employee.telegramLink ?
          `<a href="${this.employee.telegramLink}" target="_blank">${this.employee.telegramLink}</a>` :
          '',
      },
      {
        title: 'CV link',
        data: this.employee.cvLink ?
          `<a href="${this.employee.cvLink}" target="_blank">${this.employee.cvLink}</a>` :
          '',
      },
      {
        title: 'Birthday',
        data: this.employee.getBirthday().format('DD/MM/YYYY'),
      },
      {
        title: 'First working day',
        data: this.employee.getFirstday().format('DD/MM/YYYY'),
      },
      {
        title: 'Biography',
        data: this.employee.bio,
      },
    ];
  }

  private _getEmployeeData(employeeId: string): void {
    this.employeeData = this.ems.getEmployeeById(employeeId).subscribe((data) => {
      this.employeeExists = data.exists;
      this.employee = data.employee;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.employeeId = params.uid;
      this._getEmployeeData(params.uid);
    });
  }

  ngOnDestroy() {
    this.employeeData.unsubscribe();
  }

}
