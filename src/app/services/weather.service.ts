import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  openmateoApiUrl = (latitude:number, longtitude:number) => {return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longtitude}&hourly=temperature_2m,relativehumitidy_2m,weathercode`}

  constructor(private http: HttpClient) { }

  getWeatherCode(): Number | String{
    if(!navigator.geolocation || !navigator) {
      return "can't access navigator";
    }
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude
      let longitude = position.coords.longitude
      this.http.get<any>(this.openmateoApiUrl(latitude,longitude)).subscribe((resp:any) => {
        let currentTime = `${new Date().toISOString().substring(0,13)}:00`
        let currentTimeWeatherIndex = resp.hourly.time.findIndex((time:string) => time === currentTime)
        let currentTimeWeathercode: number = resp.hourly.weathercode[currentTimeWeatherIndex]
        return currentTimeWeathercode
      })
    })
    return "Line 16 never worked"
  }
}
