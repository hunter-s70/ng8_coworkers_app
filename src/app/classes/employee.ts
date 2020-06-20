import moment from 'moment';
import { Constants } from './constants';

export class Employee {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public positionId: string = '',
    public skillsList: string[] = [],
    public birthday: moment.Moment = moment(),
    public firstday: moment.Moment = moment(),
    public userPhoto: string = '',
    public isActive: boolean = true,
    public createdAt: string = moment().toString(),
    public updatedAt: moment.Moment = moment(),
    public bio?: string,
    public telegramLink?: string,
    public cvLink?: string,
  ) { }

  genEmployeeDataObject(formData): object {
    return {
      ...this,
      ...formData,
      birthday: formData.birthday.toString(),
      firstday: formData.firstday.toString(),
      updatedAt: moment().toString(),
    };
  }

  getBirthday() {
    return moment(this.birthday);
  }

  getFirstday() {
    return moment(this.firstday);
  }
}
