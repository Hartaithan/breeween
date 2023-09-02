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
    volume: 0.1,
    duration: undefined,
    currentTime: undefined,
  };

  private stateChange: BehaviorSubject<PlayerState> = new BehaviorSubject(
    this.state,
  );

  timeUpdateHandler = () => {
    this.state.currentTime = this.audio.currentTime;
  };

  play(item: RecordItem): void {
    this.audio.src = item.url;
    this.audio.volume = this.state.volume;
    this.audio
      .play()
      .then(() => {
        console.info(item.name, 'is playing...');
        this.state.record = item;
        this.state.playing = true;
        this.state.duration = this.audio.duration;
        this.audio.addEventListener('timeupdate', this.timeUpdateHandler);
      })
      .catch((error) => {
        console.error('unable to load', item.name, item.url);
        console.error('error', error);
      });
  }

  continue() {
    this.audio.play();
    this.state.playing = true;
  }

  pause() {
    this.audio.pause();
    this.state.playing = false;
    this.audio.removeEventListener('timeupdate', this.timeUpdateHandler);
  }

  setVolume(value: number) {
    this.state.volume = value;
    this.audio.volume = value;
  }

  getState(): Observable<PlayerState> {
    return this.stateChange.asObservable();
  }
}
