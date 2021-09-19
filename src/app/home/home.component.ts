import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Modals } from '../datasources/modal.datasource';
import { Modal } from '../classes/modal';
import { Playlists } from '../datasources/playlists.datasource';
import { Playlist } from '../classes/playlist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  recommendPlaylistBasedOffWeathercode(weathercode: Number){
    // Search for playlists with a compatible weathercode with users
    let playlistMatches = Playlists.filter((playlist:Playlist)=>{
      if(playlist.weathercodes.includes(weathercode)){
        return true
      }else{
        return false
      }
    })

    // Select a random playlist from playlistMatches
    let recomendation = playlistMatches[Math.floor(Math.random()*playlistMatches.length)]
    return recomendation
  }

  suggestPlaylist(mode: string){
    if(navigator.geolocation || navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        var openmateoApiUrl: string = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,relativehumitidy_2m,weathercode`
        this.http.get<any>(openmateoApiUrl).subscribe((resp:any) => {
          var currentTime = `${new Date().toISOString().substr(0,13)}:00`;
          var currentTimeWeatherIndex = resp.hourly.time.findIndex((time:string) => time === currentTime)
          var currentTimeWeathercode = resp.hourly.weathercode[currentTimeWeatherIndex]
          this.recommendPlaylistBasedOffWeathercode(currentTimeWeathercode);
        })
      })
    }else{
      alert('Your browser does not support geolocation 😢')
    }
  }
}
