import { Injectable } from '@angular/core';
import { ObjectStoreColumns } from '../model/objectStoreColumns.model';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {

  // #region REUSABLE CODE
  /** Region of reusable code also working in other projects.  */

  public isIndexedDbAvailable(): boolean {
    if (!('indexedDB' in window)) {
      console.log("This browser doesn't support IndexedDB");
      return false;
    }
    return true;
  }
  
  // #region indexedDb

  /**Method to create an IndexedDB (i.e. the database) */
  public createIndexedDb(dbName: string) {
    return window.indexedDB.open(dbName, 1);
  }

  /* Method returning a promise to resolve. */
  public async openDb(name: string): Promise<unknown> {
    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB.");
        return null;
    }

    /* request type is IDBOpenDBRequest, a promise to resolve */
    var request = window.indexedDB.open(name, 1) as IDBOpenDBRequest; 

    let el = null;
    const myPromise = new Promise((resolve, reject) => { 
        request.onsuccess = function(event) {
            el = Object.assign(event.target).result;
            resolve(el);
        };
        request.onerror = function() {
            reject();
        }
    });

    return myPromise;
 }

  // #endregion 

  // #region ObjectStore

  /**Creating table into the specified database */
  public createObjectStore(
    nameIndexedDb: string,
    nameObjectStore: string,
    columns?: ObjectStoreColumns[]
  ) {
    // Opening the dtaabase and getting the promise
    var request = window.indexedDB.open(nameIndexedDb, 1);
    // This handler is only supported in recent browsers.
    request.onupgradeneeded = (event) => {
      var db = Object.assign(event.target).result;
      // Create an objectStore for this database
      var objectStore = db.createObjectStore(nameObjectStore, {
        keyPath: 'taskTitle',
      });
      if (ObjectStoreColumns == null) return objectStore;
      // define what data items the objectStore will contain
      columns.forEach((row) => {
        objectStore.createIndex(row['columnName'], row['columnName'], {
          unique: row['isUnique'],
        });
      });

      return objectStore;
    };
    return null;
  }

  /**Method getting the specified objectstore from the specified database. 
  * @indexedDb database from which getting the specified objectstore 
  * @objectName name of the objectstore to get from the database.
  */
  public GetDbObjectstore(indexesDb: IDBDatabase, objectName: string): IDBObjectStore {
    const transaction = indexesDb.transaction([objectName]);
    const objectStore = transaction.objectStore(objectName);
    return objectStore;
  }

    /**Method allowing to get an element from an objectStore object
   * using the specified primary key. 
   * This methos incapsulates an async callback call when 
   * onsuccess event is triggered into a promise. 
   * This allows to resolve the promise in OOP style.
   * @objectStore database object from which getting data
   * @elementPrimaryKey string representing the primary key of the element to get from the object.
   */
    public async getObjectElement(objectStore, elementPrimaryKey) {
      var objectStore2 = objectStore.get(elementPrimaryKey);
      let element = null;
      const prom = new Promise((resolve, reject) => {
          objectStore2.onsuccess = function(event) {
              if(objectStore2.result) {
                console.log('success message!');
                element = objectStore2.result;
                resolve(element);
              } else {
                console.log('error message!');  
                element = null;
                resolve(element);
              }
            };
      });

      return prom;
    }

  // #endregion


  // #endregion
}
