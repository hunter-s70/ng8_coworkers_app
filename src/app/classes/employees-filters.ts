export class EmployeesFilters {
  constructor(
    public searchBy: string = '',
    public searchText: string = '',
    public positionId: string = '',
    public skillName: string = '',
  ) { }
}
