import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Modals } from '../datasources/modal.datasource';
import { Modal } from '../classes/modal';
import { Playlist } from '../classes/playlist';
import { PlaylistsService } from '../services/playlists.service'
import { WeatherService } from '../services/weather.service';
import { Keyplaylist } from '../classes/keyplaylist';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PlaylistsService]
})

export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private playlistsService: PlaylistsService, private meta: Meta, private weatherService: WeatherService) {

    this.meta.addTags([
      { name: 'description', content: 'Musicflake recommends music based on your weather conditions.' },
      { name: 'keywords', content: 'musicflake, weather, music, weather based song recommendation, music recommendation, playlists, top lists' },
      { name: 'author', content: 'Yusuf Bıyık' }  
    ]);  

  }

  Playlists: Keyplaylist[] = this.playlistsService.getPlaylists()
  ngOnInit(): void {
  }
  
  verified:boolean = false;

  verifyCaptcha(event :any){
    if(!(event.type == "verified" && event.isTrusted == true)) return
    this.verified = true
  }
  
  openNotification(header: string, description: string){
    var notification = document.getElementById('notification')
    var notificatonHeader = document.getElementById('notification-header')
    var notificatonDescription = document.getElementById('notification-description')

    if(!notification || !notificatonHeader || !notificatonDescription){
      this.openModal('error', {
        headerParameters:[],
        contentParameters:[`<code>Error:<br>One or more of the following elements does not exist:<br>notification, notificatonHeader, notificatonDescription</code>`]
      }); 
      return;
    }

    // Change notification contents
    notificatonHeader.innerHTML = header;
    notificatonDescription.innerHTML = description;

    // Hide or show notification
    if(notification.classList.contains('bottom-hidden')) notification.classList.toggle('bottom-hidden');
    setTimeout(() => {
      // Return if the element is already hidden
      if(notification?.classList.contains('bottom-hidden')) return;
      this.closeNotification()
    }, 5000);
  }

  closeNotification(){
    var notification = document.getElementById('notification')
    if(!notification){
      this.openModal('error', {
        headerParameters:[],
        contentParameters:[`<code>Error:<br>Element with the id of 'notification' does not exist.</code>`]
      }); 
      return;
    }
    notification.classList.toggle('bottom-hidden')
  }

  modifyModalWithParameters(modal:Modal, parameters:any){
    // Modify header if there are any parameters
    if(parameters.headerParameters.length>0){
      var headingCounter:number = 0
      parameters.headerParameters.forEach((headingParameter:string) => {
        let currentParameter = new RegExp(`{{param${headingCounter}}}`, 'g');
        modal.header = modal.header.replace(currentParameter, headingParameter)
        headingCounter++
      });
    }
    // Modify content if there are any parameters
    if(parameters.contentParameters.length>0){
      var contentCounter:number = 0
      parameters.contentParameters.forEach((contentParameter:string) => {
        let currentParameter = new RegExp(`{{param${contentCounter}}}`, 'g');
        modal.content = modal.content.replace(currentParameter, contentParameter)
        contentCounter++
      });
    }
    return modal
  }
  
  openModal(modalShorthand:string, parameters?:Object){
    let documentModal = document.getElementById('modal')
    let backdropElement = document.getElementById('backdrop')
    let captcha = document.getElementById('captcha');

    // Clone the object to keep the original object the way it is so that it does not get modified and cause the parameters to disappear and make the same playlist show up everytime
    let modal = Object.assign({}, Modals.find((modal:Modal)=> modal.shorthand === modalShorthand))
    if(!modal) {
      this.openNotification('Error', `Check console for more information:<br><code>Error:<br>Cannot find modal with specified shorthand (${modalShorthand})</code>`); 
      return;
    }

    let modalHeader = document.getElementById('modal-header')
    let modalContent = document.getElementById('modal-content')
    if(!modalHeader || !modalContent || !documentModal || !backdropElement) {
      this.openNotification('Error', `Check console for more information:<br><code>One or more of the following elements does not exist:<br>modalHeader, modalContent, documentModal, backdropElement</code>`);
      console.error([modalHeader, modalContent, documentModal, backdropElement]) 
      return;
    } 
    if(parameters) modal = this.modifyModalWithParameters(modal, parameters)
    modalHeader.innerHTML = modal.header
    modalContent.innerHTML = modal.content
    
    // Show modal and enable trasparent gray background after editing modal header and content
    documentModal.classList.toggle('hidden')
    backdropElement.classList.toggle('invisible')

    // Features specific for playlist modal
    let spotifyButton = document.getElementById('spotify-button')
    if(spotifyButton){
      // Captcha only needs to appear if the modal shorthand is playlist so there is no need to add any other if statement
      if(captcha?.classList.contains("invisible")) captcha?.classList.toggle("invisible");
      // Take the playlist link from the "a" tag that that wraps spotifyButton
      let openInSpotifyLink:any;
      if(document.getElementById('openInSpotifyLink')) openInSpotifyLink = document.getElementById('openInSpotifyLink')?.getAttribute('href');
      
      // Show a notification to let the user know that the playlist is opened.
      spotifyButton.addEventListener('click', () => this.openNotification('Playlist is Opened!', 'Check your Spotify app.'))

      
      // Voting feature is disabled until further update
      // // Upvote
      // document.getElementById("upVoteButton")?.addEventListener('click', () => {
      //   this.votePlaylist(true, openInSpotifyLink)
      // })
      // // Downvote
      // document.getElementById("downVoteButton")?.addEventListener('click', () => {
      //   this.votePlaylist(false, openInSpotifyLink)
      // })
      
    }
  }

  closeModal(){
    // Hide modal
    let documentModal = document.getElementById('modal')
    let backdropElement = document.getElementById('backdrop')
    documentModal?.classList.toggle('hidden')
    backdropElement?.classList.toggle('invisible')
    
    // Hide captcha
    let captcha = document.getElementById('captcha');
    if(!captcha?.classList.contains("invisible")) captcha?.classList.toggle("invisible");
  }

  recommendPlaylistBasedOffWeathercode(weathercode: Number){
    // Search for playlists with a compatible weathercode with the users weathercode
    let playlistMatches: Keyplaylist[] = this.Playlists.filter((keyplaylist:Keyplaylist)=> keyplaylist.playlist.weathercodes.includes(weathercode))
    // Select a random playlist from matched playlists
    let recommendation: Playlist = playlistMatches[Math.floor(Math.random()*playlistMatches.length)].playlist
    return recommendation
  }

  createSpotifyEmbedUrl(playlistUrl:String){
    return `https://open.spotify.com/embed/playlist/${playlistUrl.substring(34, 76)}`
  }

  suggestPlaylist(){
    let weatherCode = this.weatherService.getWeatherCode()

    if(weatherCode === "can't access navigator") {
      this.openNotification('Your browser does not support geolocation 😢', `We need to know your location to recommend a playlist.`);
      return
    }

    if(Number(weatherCode) == NaN){
      this.openNotification("Unknown error", "Check console for more details"); 
      console.error(weatherCode)
      return;
    } 

    let recommendedPlaylist = this.recommendPlaylistBasedOffWeathercode(Number(weatherCode)); 
    if(!recommendedPlaylist) {
      this.openNotification("Cannot find any playlists for your weather conditions 😥", "You can fix this by sending us a playlist that you think is suitable for this weather."); 
      return;
    }
    
    let playlistEmbedSource = this.createSpotifyEmbedUrl(recommendedPlaylist.url);
    this.openModal('playlist', {headerParameters:[], contentParameters:[playlistEmbedSource, recommendedPlaylist.uri]})
  }

  // Voting feature is disabled until further update
  // votePlaylist(vote: boolean, playlistEmbedUrl:string){
  //   // if(this.verified == false){
  //   //   this.openNotification("Please confirm that you are a human.","Complete the captcha.")
  //   //   return
  //   // }
  //   let votedPlaylist;
  //   // console.log(playlistEmbedUrl)
  //   votedPlaylist = this.Playlists.find((Playlist) => Playlist.playlist.uri.endsWith(playlistEmbedUrl.substring(34,76)))
  //   switch (vote) {
  //     // Upvote
  //     case true:
  //       if(votedPlaylist!.playlist.score > 0 && votedPlaylist!.playlist.score < 100) votedPlaylist!.playlist.score += 1;
  //       break;
  //     // Downvote  
  //     case false:
  //       if(votedPlaylist!.playlist.score > 0 && votedPlaylist!.playlist.score < 100) votedPlaylist!.playlist.score -= 1;
  //       break;
  //     // Neither so it's an error
  //     default:
  //       this.openNotification("Vote is not valid", "Please report if you think this is an error.")
  //       break;
  //   }
  //   if(this.playlistsService.dbVotePlaylist(votedPlaylist!.playlist) === false) this.openNotification("Can't find playlist in database", "Please report if you think this is an error.")
  //   this.openNotification("Successfully voted the playlist", "")
  //   this.verified = false
  // }
}