import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
} from '@angular/fire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
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
    const todosQuery = query(this.recordsCollection);
    return collectionData(todosQuery, idField) as Observable<RecordItem[]>;
  }

  addTodo(record: NewRecordItem) {
    return addDoc(this.recordsCollection, record);
  }

  deleteTodo(id: string) {
    const ref = doc(this.firestore, `records/${id}`);
    return deleteDoc(ref);
  }
}
