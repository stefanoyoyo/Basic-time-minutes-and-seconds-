import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {

  public save(toSave: number) {
       
  }

  // #region API

  public isIndexedDbAvailable(): boolean {
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return false;
    }
    return true;
  }

  /**Creating table into the specified database */
  public createObjectStore(nameIndexedDb: string, nameObjectStore: string ) {

  }

  // #endregion

}