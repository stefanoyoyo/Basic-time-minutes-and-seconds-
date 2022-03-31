import { Injectable } from "@angular/core";
import { ObjectStoreColumns } from "../model/objectStoreColumns.model";

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {

  // #region APP CODE
  /**Region including the code only working in this app. */

  public save(toSave: number) {
    const cols: ObjectStoreColumns[] = ObjectStoreColumns.getTestModel()
    // this.createObjectStore('ciao', 'Person', cols  );

    // aggiustare
    const obj = this.getObjectStore('Database', 'Person');
  }

  // #endregion

  // #region REUSABLE CODE
  /** Region of reusable code also working in other projects.  */

  public isIndexedDbAvailable(): boolean {
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return false;
    }
    return true;
  }

  /**Method to create an IndexedDB (i.e. the database) */
  public createIndexedDb(dbName: string) {
    return window.indexedDB.open(dbName, 1);
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

    /**Method getting the specified objectstore from the specified database. 
     * @indexedDb database from which getting the specified objectstore 
     * @objectName name of the objectstore to get from the database.
    */
     public getDbObjectstore(indexesDb, objectName) {
      const transaction = indexesDb.transaction([objectName]);
      const objectStore = transaction.objectStore(objectName);
      return objectStore;
  }

  // #endregion

}