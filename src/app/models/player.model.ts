import { RecordItem } from './record.model';

export interface PlayerState {
  record: RecordItem | null;
  playing: boolean;
  volume: number;
  duration?: number;
  currentTime?: number;
}
