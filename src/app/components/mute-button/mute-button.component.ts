import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-mute-button',
  templateUrl: './mute-button.component.html',
  styleUrls: ['./mute-button.component.css']
})
export class MuteButtonComponent implements OnInit {
  isMute = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
