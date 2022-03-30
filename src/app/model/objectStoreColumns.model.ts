export class ObjectStoreColumns {
  columnName: string;
  isUnique: boolean;

  constructor(columnName: string, isUnique: boolean) {
    this.columnName = columnName;
    this.isUnique = isUnique;
  }

  public static getTestModel(): ObjectStoreColumns[] {
    const cols: ObjectStoreColumns[] = [];
    cols.push(new ObjectStoreColumns('id', true));
    cols.push(new ObjectStoreColumns('name', false));
    cols.push(new ObjectStoreColumns('birth', false));
    return cols;
  }
}