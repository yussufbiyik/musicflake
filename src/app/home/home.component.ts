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
    switch (weathercode){
      case 0:
        // Weather -> Clear sky
        var playlistFits = Playlists.filter((playlist:Playlist)=>{
          if(playlist.weathercode.includes(weathercode)){
            return true
          }else{
            return false
          }
        })
        var recomendation = playlistFits[Math.floor(Math.random()*playlistFits.length)]
        break;
      case 1 | 2 | 3:
        // Weather -> Mainly clear, partly cloudy, and overcast
        var playlistFits = Playlists.filter((playlist:Playlist)=>{
          if(playlist.weathercode.includes(weathercode)){
            return true
          }else{
            return false
          }
        })
        var recomendation = playlistFits[Math.floor(Math.random()*playlistFits.length)]
        break;
      case 45 | 48:
        // Weather -> Fog and depositing rime fog
        var playlistFits = Playlists.filter((playlist:Playlist)=>{
          if(playlist.weathercode.includes(weathercode)){
            return true
          }else{
            return false
          }
        })
        var recomendation = playlistFits[Math.floor(Math.random()*playlistFits.length)]
        break;
      case 51 | 53 | 55:
        // Weather -> Drizzle: Light, moderate, and dense intensity
        var playlistFits = Playlists.filter((playlist:Playlist)=>{
          if(playlist.weathercode.includes(weathercode)){
            return true
          }else{
            return false
          }
        })
        var recomendation = playlistFits[Math.floor(Math.random()*playlistFits.length)]
        break;
      case 56 | 57:
        // Weather -> Freezing Drizzle: Light and dense intensity
        var playlistFits = Playlists.filter((playlist:Playlist)=>{
          if(playlist.weathercode.includes(weathercode)){
            return true
          }else{
            return false
          }
        })
        var recomendation = playlistFits[Math.floor(Math.random()*playlistFits.length)]
        break;
      case 61 | 63 | 65:
        // Weather -> Rain: Slight, moderate and heavy intensity
        var playlistFits = Playlists.filter((playlist:Playlist)=>{
          if(playlist.weathercode.includes(weathercode)){
            return true
          }else{
            return false
          }
        })
        var recomendation = playlistFits[Math.floor(Math.random()*playlistFits.length)]
        break;
      case 66 | 67:
        // Weather -> Freezing Rain: Light and heavy intensity
        var playlistFits = Playlists.filter((playlist:Playlist)=>{
          if(playlist.weathercode.includes(weathercode)){
            return true
          }else{
            return false
          }
        })
        var recomendation = playlistFits[Math.floor(Math.random()*playlistFits.length)]
        break;
      case 71 | 73 | 75:
        // Weather -> Snow fall: Slight, moderate, and heavy intensity
        var playlistFits = Playlists.filter((playlist:Playlist)=>{
          if(playlist.weathercode.includes(weathercode)){
            return true
          }else{
            return false
          }
        })
        var recomendation = playlistFits[Math.floor(Math.random()*playlistFits.length)]
        break;
      case 77:
        // Weather -> Snow grains
        var playlistFits = Playlists.filter((playlist:Playlist)=>{
          if(playlist.weathercode.includes(weathercode)){
            return true
          }else{
            return false
          }
        })
        var recomendation = playlistFits[Math.floor(Math.random()*playlistFits.length)]
        break;
      case 80 | 81 | 82:
        // Weather -> Rain showers: Slight, moderate, and violent
        var playlistFits = Playlists.filter((playlist:Playlist)=>{
          if(playlist.weathercode.includes(weathercode)){
            return true
          }else{
            return false
          }
        })
        var recomendation = playlistFits[Math.floor(Math.random()*playlistFits.length)]
        break;
      case 85 | 86:
        // Weather -> Snow showers slight and heavy
        var playlistFits = Playlists.filter((playlist:Playlist)=>{
          if(playlist.weathercode.includes(weathercode)){
            return true
          }else{
            return false
          }
        })
        var recomendation = playlistFits[Math.floor(Math.random()*playlistFits.length)]
        break;
      case 95:
        // Weather -> Thunderstorm: Slight or moderate
        var playlistFits = Playlists.filter((playlist:Playlist)=>{
          if(playlist.weathercode.includes(weathercode)){
            return true
          }else{
            return false
          }
        })
        var recomendation = playlistFits[Math.floor(Math.random()*playlistFits.length)]
        break;
      case 96 | 99:
        // Weather -> Thunderstorm with slight and heavy hail
        var playlistFits = Playlists.filter((playlist:Playlist)=>{
          if(playlist.weathercode.includes(weathercode)){
            return true
          }else{
            return false
          }
        })
        var recomendation = playlistFits[Math.floor(Math.random()*playlistFits.length)]
        break;
      default:
        console.log("no fit")
        console.log(weathercode)
        break;
    }
  }

  suggestPlaylist(mode: string){
    if(navigator.geolocation || navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        var openmateoApiUrl: string = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,relativehumitidy_2m,weathercode`
        this.http.get<any>(openmateoApiUrl).subscribe((resp:any) => {
          var currentTime = `${new Date().toISOString().substr(0,13)}:00`;
          var currentTimeWeatherIndex = resp.hourly.time.findIndex((time:string) => time === currentTime)
          var currentTimeWeathercode = resp.hourly.weathercode[currentTimeWeatherIndex]
          console.table({"weathercode":currentTimeWeathercode,"weatherIndex":currentTimeWeatherIndex})
          this.recommendPlaylistBasedOffWeathercode(currentTimeWeathercode);
        })
      })
    }else{
      alert('Your browser does not support geolocation 😢')
    }
  }
}
