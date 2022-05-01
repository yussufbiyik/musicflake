import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  // votePlaylist(playlist: Playlist, upVote: boolean){
  //   if(this.getPlaylists().find((searcehPlaylist:Playlist) => searcehPlaylist.uri === playlist.uri)){
  //     var selectedPlaylist = this.getPlaylists().find((searcehPlaylist:Playlist) => searcehPlaylist.uri === playlist.uri);
  //     this.http.post<Playlist>(`${this.firebaseURL}/playlists.json`, selectedPlaylist).subscribe((resp:any) => console.log(resp))
  //   }
  // }
  
  /* 
    postPlaylists(){
      Playlists.forEach((selectedPlaylist:Playlist) => {
        return this.http.post<Playlist>(`${this.firebaseURL}/playlists.json`, selectedPlaylist).subscribe((resp) => console.log(resp))
      })
    }
  */
}
