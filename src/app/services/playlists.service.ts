import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Keyplaylist } from '../classes/keyplaylist';
import { Playlist } from '../classes/playlist';
@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  firebaseURL = "https://musicflake-3f0a8-default-rtdb.firebaseio.com/";

  public playlists: Keyplaylist[] = [];
  constructor(private http: HttpClient) { }

  getPlaylists():Keyplaylist[] {
    this.http.get<object[]>(`${this.firebaseURL}/playlists.json`).subscribe((resp: object) => {
      Object.entries(resp).map(entry => this.playlists.push({"key": entry[0], "playlist":entry[1]}) );
    })
    return this.playlists;
  }

  dbVotePlaylist(playlist: Playlist): boolean{
    var selectedPlaylist = this.playlists.find((searcehPlaylist:Keyplaylist) => searcehPlaylist.playlist.uri === playlist.uri);
    if(typeof selectedPlaylist == undefined){ 
      console.error("Can't find playlist in database\n" + playlist)
      return false
    }
    
    this.http.put<Playlist>(`${this.firebaseURL}/playlists/${selectedPlaylist?.key}.json`, playlist).subscribe((resp:any) => {})
    // console.log(`${this.firebaseURL}/playlists/${selectedPlaylist?.key}.json`)
    return true
  }
}
