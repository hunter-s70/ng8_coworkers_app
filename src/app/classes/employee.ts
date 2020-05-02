import moment from 'moment';

export class Employee {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public bio?: string,
    public email?: string,
    public birthday?: moment.Moment,
    public firstday?: moment.Moment,
    public positionId?: string,
    public skills?: string[],
  ) { }
}
