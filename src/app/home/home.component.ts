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

  modifyModalWithParameters(modal:Modal, parameters:any){
    if(parameters.headerParameters.length>0){
      var headingCounter:number = 0
      parameters.headerParameters.forEach((headingParameter:string) => {
        let currentParameter = `{{param${headingCounter}}}`;
        modal.header = modal.header.replace(currentParameter, headingParameter)
        headingCounter++
      });
    }
    if(parameters.contentParameters.length>0){
      var contentCounter:number = 0
      parameters.contentParameters.forEach((contentParameter:string) => {
        let currentParameter = `{{param${contentCounter}}}`;
        modal.content = modal.content.replace(currentParameter, contentParameter)
        contentCounter++
      });
    }
    return modal
  }
  
  openModal(modalShorthand:string, parameters?:Object){
    var documentModal = document.getElementById('modal')
    var backdropElement = document.getElementById('backdrop')
    // Clone the object to keep the original object the way it is so that it does not get modified and cause the parameters to disappear and make the same playlist show up everytime
    var modal = Object.assign({}, Modals.find((modal:Modal)=> modal.shorthand === modalShorthand))
    console.log(modal)
    if(!modal) {
      this.openModal('error', {
        headerParameters:[],
        contentParameters:[`<code>Error:<br>Cannot find modal with specified shorthand (${modalShorthand})</code>`]
      }); 
      return;
    }
    var modalHeader = document.getElementById('modal-header')
    var modalContent = document.getElementById('modal-content')
    if(!modalHeader || !modalContent || !documentModal || !backdropElement) {
      this.openModal('error', {
        headerParameters:[],
        contentParameters:[`<code>Error:<br>One or more of the following elements does not exist:<br>modalHeader, modalContent, documentModal, backdropElement</code>`]
      }); 
      return;
    } 
    if(parameters) modal = this.modifyModalWithParameters(modal, parameters)
    modalHeader.innerHTML = modal.header
    modalContent.innerHTML = modal.content
    documentModal.classList.toggle('hidden')
    backdropElement.classList.toggle('invisible')
  }

  closeModal(){
    var documentModal = document.getElementById('modal')
    var backdropElement = document.getElementById('backdrop')
    documentModal?.classList.toggle('hidden')
    backdropElement?.classList.toggle('invisible')
  }

  recommendPlaylistBasedOffWeathercode(weathercode: Number){
    // Search for playlists with a compatible weathercode with users
    let playlistMatches: Array<Playlist> = Playlists.filter((playlist:Playlist)=> playlist.weathercodes.includes(weathercode))
    // Select a random playlist from playlistMatches
    let recommendation: Playlist = playlistMatches[Math.floor(Math.random()*playlistMatches.length)]
    return recommendation
  }

  createSpotifyEmbedUrl(playlistUrl:String){
    return `https://open.spotify.com/embed/playlist/${playlistUrl.substring(34, 76)}`
  }

  suggestPlaylist(mode: string){
    if(!navigator.geolocation || !navigator) {
      this.openModal('error', {
        headerParameters:[],
        contentParameters:[`Your browser does not support geolocation 😢`]
      });
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      var openmateoApiUrl: string = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,relativehumitidy_2m,weathercode`
      this.http.get<any>(openmateoApiUrl).subscribe((resp:any) => {
        var currentTime = `${new Date().toISOString().substr(0,13)}:00`
        var currentTimeWeatherIndex = resp.hourly.time.findIndex((time:string) => time === currentTime)
        var currentTimeWeathercode = resp.hourly.weathercode[currentTimeWeatherIndex]
        var playlistEmbedSource = this.createSpotifyEmbedUrl(this.recommendPlaylistBasedOffWeathercode(currentTimeWeathercode).url);
        this.openModal('playlist', {headerParameters:[], contentParameters:[playlistEmbedSource]})
      })
    })
  }
}
