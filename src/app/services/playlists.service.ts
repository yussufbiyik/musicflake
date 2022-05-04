import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Keyplaylist } from '../classes/keyplaylist';
import { Playlist } from '../classes/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  firebaseURL = "https://musicflake-3f0a8-default-rtdb.firebaseio.com/"

  public playlists: Keyplaylist[] = [];
  constructor(private http: HttpClient) { }

  getPlaylists():Keyplaylist[] {
    // this.http.get<Playlist[]>(`${this.firebaseURL}/playlists.json`).subscribe((resp: object) => {
    //   Array.from(Object.values(resp)).forEach((playlist: any) => {
    //     this.playlists.push(playlist)
    //   })
    // })
    // return this.playlists;

    this.http.get<object[]>(`${this.firebaseURL}/playlists.json`).subscribe((resp: object) => {
      var i = 0;
      var keys: string[] = Array.from(Object.keys(resp));

      Array.from(Object.values(resp)).forEach((playlist: Playlist) => {
        var currentKey = keys[i]
        this.playlists.push({"key":currentKey,"playlist":playlist})
        i++;
      })
    })
    return this.playlists;
  }

  dbVotePlaylist(playlist: Playlist): boolean{
    var selectedPlaylist = this.getPlaylists().find((searcehPlaylist:Keyplaylist) => searcehPlaylist.playlist.uri === playlist.uri);
    if(typeof selectedPlaylist == undefined){ 
      console.error("Can't find playlist in database\n" + playlist)
      return false
    }
    this.http.put<Playlist>(`${this.firebaseURL}/playlists/${selectedPlaylist?.key}.json`, playlist).subscribe((resp:any) => {})
    console.log(`${this.firebaseURL}/playlists/${selectedPlaylist?.key}.json`)
    return true
  }
  
  /* 
    postPlaylists(){
      Playlists.forEach((selectedPlaylist:Playlist) => {
        return this.http.post<Playlist>(`${this.firebaseURL}/playlists.json`, selectedPlaylist).subscribe((resp) => console.log(resp))
      })
    }
  */
}
