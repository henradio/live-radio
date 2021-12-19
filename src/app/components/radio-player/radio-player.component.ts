import {Component, Input, OnInit} from '@angular/core';
import {StreamState} from "../../interfaces/stream-state";
import {AudioService} from "../../services/audio.service";

const radioStreamUrl = 'https://live.hen.radio:8000/radio.mp3';

@Component({
  selector: 'app-radio-player',
  templateUrl: './radio-player.component.html',
  styleUrls: ['./radio-player.component.css'],
})
export class RadioPlayerComponent implements OnInit {
  state: StreamState | undefined;
  constructor(protected audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.playStream(radioStreamUrl).subscribe(events => {
      // console.log('Events :::', events);
    });
    this.audioService.getState().subscribe(state => {
      // console.log('State :::', state);
      this.state = state;
    });
  }
}
