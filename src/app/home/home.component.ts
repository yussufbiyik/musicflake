import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Modals } from '../datasources/modal.datasource';
import { Modal } from '../classes/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  determineWeatherCondition(weathercode: Number){
    switch (weathercode){
      case 0:
        // Weather -> Clear sky
        console.log("Weather -> Clear sky")
        break;
      case 1 || 2 || 3:
        // Weather -> Mainly clear, partly cloudy, and overcast
        console.log("Weather -> Mainly clear, partly cloudy, and overcast")
        break;
      case 45 || 48:
        // Weather -> Fog and depositing rime fog
        console.log("Weather -> Fog and depositing rime fog")
        break;
      case 51 || 53 || 55:
        // Weather -> Drizzle: Light, moderate, and dense intensity
        console.log("Weather -> Drizzle: Light, moderate, and dense intensity")
        break;
      case 56 || 57:
        // Weather -> Freezing Drizzle: Light and dense intensity
        console.log("Weather -> Freezing Drizzle: Light and dense intensity")
        break;
      case 61 || 63 || 65:
        // Weather -> Rain: Slight, moderate and heavy intensity
        console.log("Weather -> Rain: Slight, moderate and heavy intensity")
        break;
      case 66 || 67:
        // Weather -> Freezing Rain: Light and heavy intensity
        console.log("Weather -> Freezing Rain: Light and heavy intensity")
        break;
      case 71 || 73 || 75:
        // Weather -> Snow fall: Slight, moderate, and heavy intensity
        console.log("Weather -> Snow fall: Slight, moderate, and heavy intensity")
        break;
      case 77:
        // Weather -> Snow grains
        console.log("Weather -> Snow grains")
        break;
      case 80 || 81 || 82:
        // Weather -> Rain showers: Slight, moderate, and violent
        console.log("Weather -> Rain showers: Slight, moderate, and violent")
        break;
      case 85 || 86:
        // Weather -> Snow showers slight and heavy
        console.log("Weather -> Snow showers slight and heavy")
        break;
      case 95:
        // Weather -> Thunderstorm: Slight or moderate
        console.log("Weather -> Thunderstorm: Slight or moderate")
        break;
      case 96 || 99:
        // Weather -> Thunderstorm with slight and heavy hail
        console.log("Weather -> Thunderstorm with slight and heavy hail")
        break;
    }
  }

  suggestPlaylist(mode: string){
    if(navigator.geolocation || navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        console.table({"Latitude" :position.coords.latitude, "Longtitude":position.coords.longitude})
        var openmateoApiUrl: string = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,relativehumitidy_2m,weathercode`
        this.http.get<any>(openmateoApiUrl).subscribe((resp:any) => {
          var currentTime = `${new Date().toISOString().substr(0,13)}:00`;
          var currentTimeWeatherIndex = resp.hourly.time.findIndex((time:string) => time === currentTime)
          var currentTimeWeathercode = resp.hourly.weathercode[currentTimeWeatherIndex]
          this.determineWeatherCondition(currentTimeWeathercode);
        })
      })
    }else{
      alert('Your browser does not support geolocation 😢')
    }
  }
}
