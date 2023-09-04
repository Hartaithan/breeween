import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { RecordItem } from '../models/record.model';
import { PlayerState } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  audio: HTMLAudioElement = new Audio();

  events = [
    'play',
    'playing',
    'pause',
    'timeupdate',
    'durationchange',
    'ended',
    'error',
  ];

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

  private handler: EventListener = (event) => {
    switch (event.type) {
      case 'play':
        this.state.duration = this.audio.duration;
        break;
      case 'playing':
        this.state.playing = true;
        break;
      case 'pause':
        this.state.playing = false;
        break;
      case 'timeupdate':
        this.state.currentTime = this.audio.currentTime;
        break;
      case 'durationchange':
        this.state.duration = this.audio.duration;
        break;
      case 'ended':
        this.state.playing = false;
        this.state.currentTime = 0;
        break;
      case 'error':
        this.state = {
          record: null,
          playing: false,
          volume: 0.1,
          duration: undefined,
          currentTime: undefined,
        };
        break;
    }
  };

  private addEvents(
    element: HTMLAudioElement,
    events: string[],
    handler: EventListener,
  ) {
    events.forEach((event) => element.addEventListener(event, handler));
  }

  private removeEvents(
    element: HTMLAudioElement,
    events: string[],
    handler: EventListener,
  ) {
    events.forEach((event) => element.removeEventListener(event, handler));
  }

  cleanEvents() {
    this.removeEvents(this.audio, this.events, this.handler);
  }

  play(item: RecordItem): void {
    this.audio.src = item.url;
    this.audio.volume = this.state.volume;
    this.addEvents(this.audio, this.events, this.handler);
    this.audio
      .play()
      .then(() => {
        console.info(item.name, 'is playing...');
        this.state.record = item;
      })
      .catch((error) => {
        console.error('unable to load', item.name, item.url);
        console.error('error', error);
      });
  }

  continue() {
    this.addEvents(this.audio, this.events, this.handler);
    this.audio.play();
  }

  pause() {
    this.audio.pause();
    this.state.playing = false;
    this.removeEvents(this.audio, this.events, this.handler);
  }

  setVolume(value: number) {
    this.state.volume = value;
    this.audio.volume = value;
  }

  seekTo(value: number) {
    this.state.currentTime = value;
    this.audio.currentTime = value;
  }

  getState(): Observable<PlayerState> {
    return this.stateChange.asObservable();
  }
}
