import moment from 'moment';

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
    public bio?: string,
  ) { }
}
