import { Component, VERSION } from '@angular/core';
import { ObjectStoreColumns } from './model/objectStoreColumns.model';
import { AppComponentService } from './Services/app.component.service';
import { IndexedDbService } from './Services/indexedDb.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  minutes: number = 20;
  seconds: number = -1;
  constructor(private appComponent: AppComponentService, private indexedDb: IndexedDbService) {
    this.asyncConstructor();

  }

  async asyncConstructor() {
    const indexesDb = await this.indexedDb.openDb('Database') as IDBDatabase;
    const bb = this.indexedDb.GetDbObjectstore(indexesDb, 'Person') as IDBObjectStore;
    console.log(bb);
  }

  // #region methods

  start() {
    this.seconds = 59; 

    setInterval(()=> {
      // Decremento i secondi
      this.seconds--;
      // Decremento i minuti 
      if (this.seconds == 0) {
        this.seconds = 59;
        this.minutes--;
      }

      // this.appComponent.save(new Date().getTime());

    }, 1000)
  }

  // #endregion

}
