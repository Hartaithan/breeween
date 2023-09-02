import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { RecordItem } from '../models/record.model';
import { PlayerState } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  audio: HTMLAudioElement = new Audio();

  private state: PlayerState = {
    record: null,
    playing: false,
    duration: undefined,
    currentTime: undefined,
  };

  private stateChange: BehaviorSubject<PlayerState> = new BehaviorSubject(
    this.state,
  );

  playRecord(item: RecordItem): void {
    this.audio.src = item.url;
    this.audio
      .play()
      .then(() => {
        console.info(item.name, 'is playing...');
        this.state.record = item;
        this.state.playing = true;
      })
      .catch((error) => {
        console.error('unable to load', item.name, item.url);
        console.error('error', error);
      });
  }

  play() {
    this.audio.play();
    this.state.playing = true;
  }

  pause() {
    this.audio.pause();
    this.state.playing = false;
  }

  getState(): Observable<PlayerState> {
    return this.stateChange.asObservable();
  }
}
