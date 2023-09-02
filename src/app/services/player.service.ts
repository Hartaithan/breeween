import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { RecordItem } from '../models/record.model';
import { PlayerState } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  audio: HTMLAudioElement = new Audio();

  events = ['play', 'playing', 'pause', 'timeupdate', 'ended', 'error'];

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
        this.state.playing = true;
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

  play(item: RecordItem): void {
    this.audio.src = item.url;
    this.audio.volume = this.state.volume;
    this.audio.currentTime = 168;
    this.audio
      .play()
      .then(() => {
        console.info(item.name, 'is playing...');
        this.state.record = item;
        this.state.playing = true;
        this.state.duration = this.audio.duration;
        this.addEvents(this.audio, this.events, this.handler);
      })
      .catch((error) => {
        console.error('unable to load', item.name, item.url);
        console.error('error', error);
      });
  }

  continue() {
    this.audio.play();
    this.state.playing = true;
    this.addEvents(this.audio, this.events, this.handler);
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

  getState(): Observable<PlayerState> {
    return this.stateChange.asObservable();
  }
}
