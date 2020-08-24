import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Project } from '../classes/project';
import { GetListRequestsParams } from '../interfaces/get-list-requests-params';
import { ProjectsFiltersInterface } from '../interfaces/projects-filters-interface';
import {
  AngularFirestore,
  AngularFirestoreDocument,
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
  * Update employees functionality
  * */

  updateProject({projectId, data}): Promise<any> {
    return this._getDocumentRef(projectId).set(data, { merge: true });
  }

  private _getDocumentRef(docId: string): AngularFirestoreDocument<any> {
    return this.afs.doc(`projects/${docId}`);
  }

  getProjectById(projectId: string): Observable<any> {
    return this._getDocumentRef(projectId)
      .get()
      .pipe(map((doc) => {
          return {
            exists: doc.exists,
            project: this._createInstanceFromData(doc)
          };
        })
      );
  }

  private _createInstanceFromData(doc): Project {
    let instance = null;
    if (doc.exists) {
      const {
        name,
        description,
        feedback,
        logo,
        reference,
        stack,
        participants,
        isActive,
        createdAt,
        updatedAt,
        startTime,
        finishTime,
      } = doc.data();

      instance = new Project(
        name,
        description,
        feedback,
        logo,
        reference,
        stack,
        participants,
        isActive,
        createdAt,
        updatedAt,
        startTime,
        finishTime);
    }
    return instance;
  }

  /*
  * Projects lists functionality
  * */

  getItemsList(
    params: ProjectsFiltersInterface | GetListRequestsParams,
    includeActive
  ): Observable<any> {
    return this._getFilteredCollectionRef(params, includeActive)
      .get()
      .pipe(map((querySnapshot) => {
        return this._genItemsList(querySnapshot);
      }));
  }

  private _getFilteredCollectionRef(
    params: ProjectsFiltersInterface | GetListRequestsParams,
    includeActive: boolean
  ): AngularFirestoreCollection<any> {
    const limitedParams = params as GetListRequestsParams;
    const filteredParams = params as ProjectsFiltersInterface;
    const isLimitedFiltrationType: boolean = !!limitedParams.limit;

    return this.afs.collection('projects', (ref) => {
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

  private _getFilteredRef(params: ProjectsFiltersInterface, ref): Query {
    let colRef = params.name ? ref.where('name', '==', params.name) : ref;
    colRef = params.skillName ? colRef.where('stack', 'array-contains', params.skillName) : colRef;
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
