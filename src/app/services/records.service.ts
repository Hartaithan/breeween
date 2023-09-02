import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  query,
} from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { NewRecordItem, RecordItem } from '../models/record.model';

const idField = { idField: 'id' };

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private recordsCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.recordsCollection = collection(this.firestore, 'records');
  }

  getRecords() {
    const recordsQuery = query(this.recordsCollection);
    return collectionData(recordsQuery, idField) as Observable<RecordItem[]>;
  }

  addTodo(record: NewRecordItem) {
    return addDoc(this.recordsCollection, record);
  }

  deleteTodo(id: string) {
    const ref = doc(this.firestore, `records/${id}`);
    return deleteDoc(ref);
  }
}
