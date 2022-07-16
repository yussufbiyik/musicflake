import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Keyplaylist } from '../classes/keyplaylist';
import { Playlist } from '../classes/playlist';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, onValue, ref } from "firebase/database";

const firebaseConfig = environment.firebaseConfig
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
var dbContent: any;

function updateDatabaseContent(data: any){
  dbContent = data
}

onValue(ref(db, 'playlists'), (snapshot) => {
  const data = snapshot.val();
  updateDatabaseContent(data)
});

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  firebaseURL = (route:string) => {
    return `https://musicflake-3f0a8-default-rtdb.firebaseio.com/${route}`
  };
  
  public playlists: Keyplaylist[] = [];
  constructor(private http: HttpClient) { }
  
  getPlaylists():Keyplaylist[] {
    // this.http.get<object[]>(`${this.firebaseURL("playlists.json")}`).subscribe((resp: object) => {
    //   Object.entries(resp).map(entry => this.playlists.push({"key": entry[0], "playlist":entry[1]}) );
    // })
    onValue(ref(db, 'playlists'), (snapshot) => {
      const data: object = snapshot.val();
      Object.entries(data).map(entry => this.playlists.push({"key": entry[0], "playlist":entry[1]}) );
    });
    return this.playlists;
  }

  dbVotePlaylist(playlist: Playlist): boolean{
    var selectedPlaylist = this.playlists.find((searcehPlaylist:Keyplaylist) => searcehPlaylist.playlist.uri === playlist.uri);
    if(typeof selectedPlaylist == undefined){ 
      console.error("Can't find playlist in database\n" + playlist)
      return false
    }
    
    this.http.put<Playlist>(this.firebaseURL(`playlists/${selectedPlaylist?.key}.json?auth=${environment.api_key}`), playlist).subscribe((resp:any) => {})
    console.log(`${this.firebaseURL}/playlists/${selectedPlaylist?.key}.json`)
    return true
  }
}
