import moment from 'moment';

export class Project {
  constructor(
    public name: string = '',
    public description: string = '',
    public logo: string = '',
    public reference: string = '',
    public stack: string[] = [],
    public participants: string[] = [],
    public isActive: boolean = true,
    public createdAt: string = moment().toString(),
    public updatedAt: moment.Moment = moment(),
    public startTime: moment.Moment = moment(),
    public finishTime: moment.Moment = moment(),
    public customerFeedback?: string,
    public techFeedback?: string,
    public managementFeedback?: string,
  ) { }
}
