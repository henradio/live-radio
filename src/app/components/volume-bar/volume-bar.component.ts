import { Component, OnInit } from '@angular/core';
import {StreamState} from "../../interfaces/stream-state";
import {AudioService} from "../../services/audio.service";

@Component({
  selector: 'app-volume-bar',
  templateUrl: './volume-bar.component.html',
  styleUrls: ['./volume-bar.component.css']
})
export class VolumeBarComponent implements OnInit {
  public state: StreamState | undefined;

  constructor(protected audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  changeVolume(event: any) {
    this.audioService.changeVolume(event.target.value);
  }
}
