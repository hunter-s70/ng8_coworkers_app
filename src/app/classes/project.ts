import moment from 'moment';

export class Project {
  constructor(
    public name: string = '',
    public description: string = '',
    public feedback: string = '',
    public logo: string = '',
    public reference: string = '',
    public stack: string[] = [],
    public participants: string[] = [],
    public isActive: boolean = true,
    public createdAt: string = moment().toString(),
    public updatedAt: moment.Moment = moment(),
    public startTime: moment.Moment = moment(),
    public finishTime: moment.Moment = null,
  ) { }

  genProjectDataObject(formData): object {
    return {
      ...this,
      ...formData,
      startTime: formData.startTime.toString(),
      finishTime: formData.finishTime ? formData.finishTime.toString() : null,
      updatedAt: moment().toString(),
    };
  }

  getMomentDate(timestamp) {
    return moment(timestamp);
  }
}
