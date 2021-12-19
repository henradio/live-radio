import {Component, OnInit} from '@angular/core';
import {StreamState} from "../../interfaces/stream-state";
import {AudioService} from "../../services/audio.service";

@Component({
  selector: 'app-mute-button',
  templateUrl: './mute-button.component.html',
  styleUrls: ['./mute-button.component.css']
})
export class MuteButtonComponent implements OnInit {
  public state: StreamState | undefined;

  constructor(protected audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  mute() {
    console.log('HERE')
    this.audioService.mute();
  }

  unmute() {
    this.audioService.unmute();
  }
}
