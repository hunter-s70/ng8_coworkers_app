import { Injectable } from '@angular/core';
import { Employee } from '../classes/employee';
import { EmployeesFilters } from '../interfaces/employees-filters';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private afs: AngularFirestore,
  ) { }


  private _getCollectionRef(): AngularFirestoreCollection<any> {
    return this.afs.collection('employees');
  }

  private _getLimitedCollectionRef(params: EmployeesFilters, isFullList): AngularFirestoreCollection<any> {
    return this.afs.collection('employees', (ref) => {
      let colRef = !isFullList ? ref.where('isActive', '==', true) : ref;
      colRef = params.limit ? colRef.limit(params.limit) : colRef;
      colRef = params.startAfter ? colRef.startAfter(params.startAfter) : colRef;
      return colRef;
    });
  }

  private _getFilteredCollectionRef(params: EmployeesFilters, isFullList): AngularFirestoreCollection<any> {
    return this.afs.collection('employees', (ref) => {
      let colRef = !isFullList ? ref.where('isActive', '==', true) : ref;
      colRef = params.positionId ? colRef.where('positionId', '==', params.positionId) : colRef;
      colRef = params.skillName ? colRef.where('skillsList', 'array-contains', params.skillName) : colRef;
      colRef = params.searchBy ? colRef.where(params.searchBy, '==', params.searchText) : colRef;
      return colRef;
    });
  }

  private _getDocumentRef(docId: string): AngularFirestoreDocument<any> {
    return this.afs.doc(`employees/${docId}`);
  }


  addEmployee({data}): Promise<any> {
    return this._getCollectionRef().add(data);
  }

  updateEmployee({employeeId, data}): Promise<any> {
    return this._getDocumentRef(employeeId).set(data, { merge: true });
  }

  getEmployeesList(params: EmployeesFilters, isFullList: boolean) {
    const getMethod = params.limit ? '_getLimitedCollectionRef' : '_getFilteredCollectionRef';
    return this[getMethod](params, isFullList).get().pipe(map((querySnapshot) => {
      return this._getEmployeesList(querySnapshot);
    }));
  }

  private _getEmployeesList(querySnapshot): any {
    const employeesList = [];
    const docsList = querySnapshot.docs;
    const lastVisibleDoc = docsList[docsList.length - 1];
    querySnapshot.forEach((employee) => {
      const employeeData = employee.data();
      employeesList.push({
        ...employeeData,
        id: employee.id,
        fullName: `${employeeData.firstName} ${employeeData.lastName}`
      });
    });
    return {employeesList, lastVisibleDoc};
  }

  getEmployeeById(employeeId: string) {
    return this._getDocumentRef(employeeId).get().pipe(
      map((doc) => {
        return {
          exists: doc.exists,
          employee: this._createEmployeeFromData(doc)
        };
      })
    );
  }

  private _createEmployeeFromData(doc) {
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
}
