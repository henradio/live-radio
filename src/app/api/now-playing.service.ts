import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

export interface INowPlaying {
  id: number,
  name: string,
  now_playing: {
    song: {
      artist: string
      title: string
      art: string
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class NowPlayingService {
  constructor(private httpClient: HttpClient) {}

  getNowPlayingById(id: number): Observable<INowPlaying> {
    return this.httpClient.get<INowPlaying>(`https://stream.hen.radio/api/nowplaying/${id}`)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }

  processError(err: any) {
    let message = '';
    if(err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    return throwError(() => message);
  }
}
