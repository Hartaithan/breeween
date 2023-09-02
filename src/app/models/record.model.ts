export interface RecordItem {
  id: string;
  name: string;
  url: string;
}

export type NewRecordItem = Omit<RecordItem, 'id'>;
