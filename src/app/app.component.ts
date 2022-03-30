import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  minutes: number = 20;
  seconds: number = -1;

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

    }, 1000)
  }

  // #endregion

}
