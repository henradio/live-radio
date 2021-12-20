import {Component, OnInit} from '@angular/core';
import {StreamState} from "../../interfaces/stream-state";
import {AudioService} from "../../services/audio.service";
import {INowPlaying, AzuraCastApiService} from "../../api/azura-cast-api.service";

const radioStreamUrl = 'https://stream.hen.radio:8000/radio.mp3';

@Component({
  selector: 'app-radio-player',
  templateUrl: './radio-player.component.html',
  styleUrls: ['./radio-player.component.css'],
})
export class RadioPlayerComponent implements OnInit {
  state?: StreamState;
  nowPlaying?: INowPlaying;

  constructor(
    protected audioService: AudioService,
    protected azuraCastApiService: AzuraCastApiService
  ) {
  }

  ngOnInit(): void {
    this.fetchNowPlaying();
    this.audioService.playStream(radioStreamUrl).subscribe(events => {
      // console.log('Events :::', events);
    });
    this.audioService.getState().subscribe(state => {
      // console.log('State :::', state);
      this.state = state;
    });
  }

  fetchNowPlaying() {
    this.azuraCastApiService
      .getNowPlayingById(1)
      .subscribe((nowPlaying) => {this.nowPlaying = nowPlaying});
  }
}
