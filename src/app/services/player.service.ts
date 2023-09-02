import { Injectable } from '@angular/core';
import { RecordItem } from '../models/record.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  audio = new Audio();

  play(item: RecordItem): void {
    this.audio.src = item.url;
    this.audio
      .play()
      .then(() => {
        console.info(item.name, 'is playing...');
      })
      .catch((error) => {
        console.error('unable to load', item.name, item.url);
        console.error('error', error);
      });
  }
}
