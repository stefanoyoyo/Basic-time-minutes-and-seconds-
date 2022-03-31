import { Component, VERSION } from '@angular/core';
import { ObjectStoreColumns } from './model/objectStoreColumns.model';
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
  constructor(private indexedDb: IndexedDbService) {
    // this.indexedDb.createObjectStore('Database', 'Person', ObjectStoreColumns.getTestModel());

    
    // const obj = this.indexedDb.getDbObjectstore('Database', 'Person');
    // console.log(obj)

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

      this.indexedDb.save(new Date().getTime());

    }, 1000)
  }

  // #endregion

}
