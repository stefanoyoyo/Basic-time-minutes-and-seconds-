import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {

  public save(toSave: number) {
       this.createObjectStore('ciao', 'mondo' ) 
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

      // define what data items the objectStore will contain
      objectStore.createIndex("hours", "hours", { unique: false });
      objectStore.createIndex("minutes", "minutes", { unique: false });
      objectStore.createIndex("day", "day", { unique: false });
      objectStore.createIndex("month", "month", { unique: false });
      objectStore.createIndex("year", "year", { unique: false });

      objectStore.createIndex("notified", "notified", { unique: false });
    };


  }

  // #endregion

}