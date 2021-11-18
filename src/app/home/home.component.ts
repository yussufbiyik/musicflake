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
  
  openModal(modalShorthand:string, modal?:Modal){
    var documentModal = document.getElementById('modal')
    var backdropElement = document.getElementById('backdrop')
    if(modalShorthand){
      var modal = Modals.find((modal:Modal)=>{
        if(modal.shorthand == modalShorthand){
          return true;
        }else{
          return false
        }
      });
      
      if(modal){
        var modalHeader = document.getElementById('modal-header')
        var modalContent = document.getElementById('modal-content')
        if(modalHeader && modalContent){
          modalHeader.innerHTML = modal.header
          modalContent.innerHTML = modal.content
        }
        documentModal?.classList.toggle('hidden')
        backdropElement?.classList.toggle('invisible')
      }
    }
  }

  closeModal(){
    var documentModal = document.getElementById('modal')
    var backdropElement = document.getElementById('backdrop')
    documentModal?.classList.toggle('hidden')
    backdropElement?.classList.toggle('invisible')
  }

  createModal(modal:Modal){
    var documentModal = document.getElementById('modal')
    var backdropElement = document.getElementById('backdrop')
    var modalHeader = document.getElementById('modal-header')
    var modalContent = document.getElementById('modal-content')
    if(modal && backdropElement){
      if(modalHeader && modalContent){
        modalHeader.innerHTML = modal.header
        modalContent.innerHTML = modal.content
      }
      documentModal?.classList.toggle('hidden')
      backdropElement?.classList.toggle('invisible')
    }
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
    let recommendation = playlistMatches[Math.floor(Math.random()*playlistMatches.length)]
    return recommendation
  }

  suggestPlaylist(mode: string){
    if(navigator.geolocation || navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        var openmateoApiUrl: string = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,relativehumitidy_2m,weathercode`
        this.http.get<any>(openmateoApiUrl).subscribe((resp:any) => {
          var currentTime = `${new Date().toISOString().substr(0,13)}:00`;
          var currentTimeWeatherIndex = resp.hourly.time.findIndex((time:string) => time === currentTime)
          var currentTimeWeathercode = resp.hourly.weathercode[currentTimeWeatherIndex]
          var modal: Modal = {
            shorthand:'playlist',
            header:'🎆 Here is your playlist.',
            content:`<iframe src="${this.recommendPlaylistBasedOffWeathercode(currentTimeWeathercode).uri}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
          }
          this.createModal(modal)
        })
      })
    }else{
      alert('Your browser does not support geolocation 😢')
    }
  }
}
