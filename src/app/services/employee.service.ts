import { Injectable } from '@angular/core';
import { Employee } from '../classes/employee';
import { EmployeesFiltersInterface } from '../interfaces/employees-filters-interface';
import { GetListRequestsParams } from '../interfaces/get-list-requests-params';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  Query
} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  employees: Employee[] = [];

  employeesData: Subscription;

  /*
  * Add employees functionality
  * */

  addEmployee({data}): Promise<any> {
    return this._getCollectionRef().add(data);
  }

  private _getCollectionRef(): AngularFirestoreCollection<any> {
    return this.afs.collection('employees');
  }

  /*
  * Update employees functionality
  * */

  updateEmployee({employeeId, data}): Promise<any> {
    return this._getDocumentRef(employeeId).set(data, { merge: true });
  }

  private _getDocumentRef(docId: string): AngularFirestoreDocument<any> {
    return this.afs.doc(`employees/${docId}`);
  }

  getEmployeeById(employeeId: string): Observable<any> {
    return this._getDocumentRef(employeeId)
      .get()
      .pipe(map((doc) => {
        return {
          exists: doc.exists,
          employee: this._createEmployeeFromData(doc)
        };
      })
    );
  }

  private _createEmployeeFromData(doc): Employee {
    let employee = null;
    if (doc.exists) {
      const {
        firstName,
        lastName,
        email,
        positionId,
        skillsList,
        birthday,
        firstday,
        userPhoto,
        isActive,
        createdAt,
        updatedAt,
        bio,
        telegramLink,
        cvLink,
      } = doc.data();

      employee = new Employee(
        firstName,
        lastName,
        email,
        positionId,
        skillsList,
        birthday,
        firstday,
        userPhoto,
        isActive,
        createdAt,
        updatedAt,
        bio,
        telegramLink,
        cvLink);
    }
    return employee;
  }

  /*
  * Employees selection functionality
  * */

  getEmployeesListForSelect(): Subscription {
    if (this.employeesData) {
      return this.employeesData;
    }

    const collectionRef: AngularFirestoreCollection<any> = this.afs
      .collection('employees', (ref) => {
        return ref
          .where('isActive', '==', true);
      });

    this.employeesData = collectionRef
      .get()
      .pipe(map((querySnapshot) => this._getDocsList(querySnapshot)))
      .subscribe((employees) => {
        this.employees = employees || [];
      });
    return this.employeesData;
  }

  private _getDocsList(querySnapshot): any {
    return querySnapshot.docs.map((doc) => {
      const employeeData = doc.data();
      employeeData.id = doc.id;
      return employeeData;
    });
  }

  getEmployeesSelectorList(): Employee[] {
    return this.employees;
  }

  /*
  * Employees lists functionality
  * */

  getEmployeesList(
    params: EmployeesFiltersInterface | GetListRequestsParams,
    includeActive
  ): Observable<any> {
    return this._getFilteredCollectionRef(params, includeActive)
      .get()
      .pipe(map((querySnapshot) => {
        return this._getEmployeesList(querySnapshot);
      }));
  }

  private _getFilteredCollectionRef(
    params: EmployeesFiltersInterface | GetListRequestsParams,
    includeActive: boolean
  ): AngularFirestoreCollection<any> {
    const limitedParams = params as GetListRequestsParams;
    const filteredParams = params as EmployeesFiltersInterface;
    const isLimitedFiltrationType: boolean = !!limitedParams.limit;

    return this.afs.collection('employees', (ref) => {
      let colRef = !includeActive ? ref.where('isActive', '==', true) : ref;
      colRef = isLimitedFiltrationType
        ? this._getLimitedRef(limitedParams, colRef)
        : this._getFilteredRef(filteredParams, colRef);
      return colRef;
    });
  }

  private _getLimitedRef(params: GetListRequestsParams, ref): Query {
    let colRef = params.limit ? ref.limit(params.limit) : ref;
    colRef = params.lastVisibleDoc ? colRef.startAfter(params.lastVisibleDoc) : colRef;
    return colRef;
  }

  private _getFilteredRef(params: EmployeesFiltersInterface, ref): Query {
    let colRef = params.positionId ? ref.where('positionId', '==', params.positionId) : ref;
    colRef = params.skillName ? colRef.where('skillsList', 'array-contains', params.skillName) : colRef;
    colRef = params.searchBy && params.searchText ? colRef.where(params.searchBy, '==', params.searchText) : colRef;
    return colRef;
  }

  private _getEmployeesList(querySnapshot): any {
    const docsList = querySnapshot.docs;
    const lastVisibleDoc = docsList[docsList.length - 1];
    const employeesList = docsList.map((employee) => {
      const employeeData = employee.data();
      return {
        ...employeeData,
        id: employee.id,
        fullName: `${employeeData.firstName} ${employeeData.lastName}`
      };
    });
    return {employeesList, lastVisibleDoc};
  }
}
