import { Injectable } from "@angular/core";
import { ObjectStoreColumns } from "../model/objectStoreColumns.model";

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {

  public save(toSave: number) {
    const cols: ObjectStoreColumns[] = ObjectStoreColumns.getTestModel()
    this.createObjectStore('ciao', 'Person', cols  ) 
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
  public createObjectStore(nameIndexedDb: string, nameObjectStore: string, columns?: ObjectStoreColumns[] ) {
    // Opening the dtaabase and getting the promise 
    var request = window.indexedDB.open(nameIndexedDb, 1);
    // This handler is called when a new version of the database
    // is created, either when one has not been created before
    // or when a new version number is submitted by calling
    // window.indexedDB.open().
    // This handler is only supported in recent browsers.
    request.onupgradeneeded = event => {
      var db = Object.assign(event.target).result;
      // Create an objectStore for this database
      var objectStore = db.createObjectStore(nameObjectStore, { keyPath: "taskTitle" });
      if (ObjectStoreColumns == null) return objectStore;
      // define what data items the objectStore will contain
      columns.forEach(row => {
        objectStore.createIndex(row['columnName'], row['columnName'], { unique: row['isUnique'] });
      });
      
      return objectStore;
    };
    return null;
  }

    /**Getting the table of the specified database */
    public getObjectStore(nameIndexedDb: string, nameObjectStore: string) {

      // Opening the dtaabase and getting the promise 
      var request = window.indexedDB.open(nameIndexedDb, 1);
  
      // Getting the table of the specified database
      request.onupgradeneeded = event => {
        var db = Object.assign(event.target).result;
        var objectStore = db.objectStore(nameObjectStore)
        return objectStore;
      };

      return null;
    }

  // #endregion

}