import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {StreamState} from "../interfaces/stream-state";

@Injectable({
  providedIn: "root"
})
export class AudioService {
  private stop$ = new Subject();
  private audioObj = new Audio();

  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: null,
    currentTime: null,
    volume: null,
    muted: null,
    canplay: false,
    error: false,
  };

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );
  
  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case "playing":
        this.state.playing = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "volumechange":
        this.state.volume = this.audioObj.volume;
        this.state.muted = this.audioObj.muted;
        break;
      case "timeupdate":
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;
      default:
        //console.log('Unhandled Event :::', event)
    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: null,
      currentTime: null,
      volume: null,
      canplay: false,
      error: false,
      muted: null,
    };
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart",
    "volumechange"
  ];

  private streamObservable(url: string) {
    return new Observable(observer => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();
      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        this.removeEvents(this.audioObj, this.audioEvents, handler);
      };
    });
  }

  private addEvents(obj: HTMLAudioElement, events: any[], handler: (event: Event) => void) {
    events.forEach((event) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: HTMLAudioElement, events: any[], handler: (event: Event) => void) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  private static pad(n: number, width: number, unit?: string) {
    unit = unit || '0';
    const nStr = n + '';
    return nStr.length >= width ? n : new Array(width - nStr.length + 1).join(unit) + n;
  }

  playStream(url: string) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  mute() {
    this.audioObj.muted = true;
  }

  unmute() {
    this.audioObj.muted = false;
  }

  changeVolume(value: any) {
    this.audioObj.volume = value;
  }

  stop() {
    this.stop$.next(true);
  }

  // seekTo(seconds: number) {
  //   this.audioObj.currentTime = seconds;
  // }

  formatTime(time: number) {
    const minutes = ~~(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes}.${AudioService.pad(~~seconds, 2)}`;
  }

  testConnection() {
  if ((this.state.currentTime == this.audioObj.currentTime) && this.state.playing ) {
    this.stop();
    this.resetState();
    this.stop$.next(false);
    this.playStream('https://stream.hen.radio/radio/8000/radio.mp3').subscribe(events => {
      //console.log('Events ::', events);
   });
  }
  }
}
