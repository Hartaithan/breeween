import { RecordItem } from './record.model';

export interface PlayerState {
  record: RecordItem | null;
  playing: boolean;
  duration: number | undefined;
  currentTime: number | undefined;
}
