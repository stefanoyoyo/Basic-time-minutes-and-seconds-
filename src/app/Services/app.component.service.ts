import { Injectable } from "@angular/core";
import { ObjectStoreColumns } from "../model/objectStoreColumns.model";

@Injectable({
  providedIn: 'root',
})
export class AppComponentService {

  /**Region including the code only working in this app. */

  public save(toSave: number) {
    const cols: ObjectStoreColumns[] = ObjectStoreColumns.getTestModel();

    // aggiustare
    // const obj = this.getDbObjectstore('Database', 'Person');
  }


 }