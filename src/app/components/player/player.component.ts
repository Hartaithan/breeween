import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerState } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnDestroy {
  state: PlayerState | undefined;
  subscription: Subscription | null = null;

  constructor(private player: PlayerService) {
    this.subscription = this.player.getState().subscribe((state) => {
      this.state = state;
    });
  }

  handlePlayback() {
    if (!this.state) return;
    if (this.state.playing) {
      this.player.pause();
    } else {
      this.player.continue();
    }
  }

  handleVolume(event: Event) {
    const target = event.target as HTMLInputElement;
    this.player.setVolume(Number(target.value));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
