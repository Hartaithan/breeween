import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collectionData,
  query,
} from '@angular/fire/firestore';
import { collection, doc, addDoc, deleteDoc } from 'firebase/firestore';
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

  addRecord(record: NewRecordItem) {
    return addDoc(this.recordsCollection, record);
  }

  deleteRecord(id: string) {
    const ref = doc(this.firestore, `records/${id}`);
    return deleteDoc(ref);
  }
}
