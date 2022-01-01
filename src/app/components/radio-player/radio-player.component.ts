import {Component, OnInit} from '@angular/core';
import {StreamState} from "../../interfaces/stream-state";
import {AudioService} from "../../services/audio.service";
import {INowPlaying, AzuraCastApiService} from "../../api/azura-cast-api.service";

const radioStreamUrl = 'https://stream.hen.radio/radio/8000/radio.mp3';

let nowPlayingTimeout;

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
    setInterval(() => {
      this.fetchNowPlaying();
    },30000);
    
    setInterval(() => {
    window.location.reload();
    },3600000)

    this.audioService.playStream(radioStreamUrl).subscribe(events => {
      // console.log('Events :::', events);
    });
    this.audioService.getState().subscribe(state => {
      // console.log('State :::', state);
      this.state = state;
    });
  }

  fetchNowPlaying() {
    // seems the subscribe is not working
    // https://docs.azuracast.com/en/developers/apis/now-playing-data
    this.azuraCastApiService
      .getNowPlayingById(1)
      .subscribe((nowPlaying) => {
        this.nowPlaying = nowPlaying});
  }
}
