import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GetListRequestsParams } from '../interfaces/get-list-requests-params';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  Query
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  /*
  * Add project functionality
  * */

  addProject({data}): Promise<any> {
    return this._getCollectionRef().add(data);
  }

  private _getCollectionRef(): AngularFirestoreCollection<any> {
    return this.afs.collection('projects');
  }

  /*
  * Projects lists functionality
  * */

  getItemsList(
    params: GetListRequestsParams,
    includeActive
  ): Observable<any> {
    return this._getFilteredCollectionRef(params, includeActive)
      .get()
      .pipe(map((querySnapshot) => {
        return this._genItemsList(querySnapshot);
      }));
  }

  private _getFilteredCollectionRef(
    params: GetListRequestsParams,
    includeActive: boolean
  ): AngularFirestoreCollection<any> {
    const limitedParams = params as GetListRequestsParams;
    // const isLimitedFiltrationType: boolean = !!limitedParams.limit;

    return this.afs.collection('projects', (ref) => {
      let colRef = !includeActive ? ref.where('isActive', '==', true) : ref;
      colRef = this._getLimitedRef(limitedParams, colRef);
      return colRef;
    });
  }

  private _getLimitedRef(params: GetListRequestsParams, ref): Query {
    let colRef = params.limit ? ref.limit(params.limit) : ref;
    colRef = params.lastVisibleDoc ? colRef.startAfter(params.lastVisibleDoc) : colRef;
    return colRef;
  }

  private _genItemsList(querySnapshot): any {
    const docsList = querySnapshot.docs;
    const lastVisibleDoc = docsList[docsList.length - 1];
    const itemsList = docsList.map((item) => {
      const docData = item.data();
      return {
        ...docData,
        id: item.id,
      };
    });
    return {itemsList, lastVisibleDoc};
  }
}
