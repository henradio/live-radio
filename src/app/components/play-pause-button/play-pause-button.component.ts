import {Component, Input, OnInit} from '@angular/core';
import {AudioService} from "../../services/audio.service";
import {StreamState} from "../../interfaces/stream-state";

@Component({
  selector: 'app-play-pause-button',
  templateUrl: './play-pause-button.component.html',
  styleUrls: ['./play-pause-button.component.css']
})
export class PlayPauseButtonComponent implements OnInit {
  public state: StreamState | undefined;

  constructor(protected audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }
}
