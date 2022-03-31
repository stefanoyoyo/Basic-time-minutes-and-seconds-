import { Injectable } from "@angular/core";
import { ObjectStoreColumns } from "../model/objectStoreColumns.model";
import { IndexedDbService } from "../Services/indexedDb.service";

@Injectable({
  providedIn: 'root',
})
export class AppComponentService {

  constructor(private indexedDb: IndexedDbService) {

  }

  public save(time: number) {
    const cols: ObjectStoreColumns[] = ObjectStoreColumns.getTestModel();

    // aggiustare
    // const obj = this.indexedDb.getDbObjectstore('Database', 'Times');
  }


 }