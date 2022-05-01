import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../classes/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  firebaseURL = "https://musicflake-3f0a8-default-rtdb.firebaseio.com/"

  public playlists: Playlist[] = [];
  constructor(private http: HttpClient) { }

  getPlaylists():Playlist[] {
    this.http.get<Playlist[]>(`${this.firebaseURL}/playlists.json`).subscribe((resp: object) => {
      Array.from(Object.values(resp)).forEach((playlist: any) => {
        this.playlists.push(playlist)
      })
    })
    return this.playlists;
  }
}
