import { Component } from '@angular/core';
import { PlayerState } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  state: PlayerState | undefined;

  constructor(private player: PlayerService) {
    this.player.getState().subscribe((state) => {
      this.state = state;
    });
  }

  handlePlayback() {
    if (!this.state) return;
    if (this.state.playing) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }
}
