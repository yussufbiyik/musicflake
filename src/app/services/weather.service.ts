import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  openmateoApiUrl = (latitude:number, longtitude:number) => {return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longtitude}&hourly=temperature_2m,relativehumitidy_2m,weathercode`}
  
  latestWeatherCode: Object = {
    date:"none",
    weatherCode:-1
  };

  constructor(private http: HttpClient) { }

  mapWeatherCode(weatherCode:number):string{
    interface map {
      type:string,
      codes:Number[]
    }

    let maps: map[]  = [
      {type:"clear ",codes:[0]},
      {type:"cloudy",codes:[1,2,3]},
      {type:"foggy ",codes:[45,48]},
      {type:"snowy ",codes:[56, 57, 71,73,75,77,85,86]},
      {type:"rainy ",codes:[51,53,55,61,63,65,66,67,77,80,81,82]},
      {type:"stormy",codes:[95,96,99]}
    ]

    let mappedWeatherCode = maps.find((map: map) => map.codes.includes(weatherCode))
    if (mappedWeatherCode == undefined) return "none"
    return mappedWeatherCode.type
  }

  getWeatherCode(): Number | String{
    try {

      if(!navigator.geolocation || !navigator) {
        return "can't access navigator";
      }

      if(Object.values(this.latestWeatherCode)[0] != "none"){
        let minuteDifference = (new Date().getTime() - Object.values(this.latestWeatherCode)[0])/60000;
        if(minuteDifference<30) return Object.values(this.latestWeatherCode)[1]
      }
      
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        this.http.get<any>(this.openmateoApiUrl(latitude,longitude)).subscribe((resp:any) => {
          let currentTime = `${new Date().toISOString().substring(0,13)}:00`
          let currentTimeWeatherIndex = resp.hourly.time.findIndex((time:string) => time === currentTime)
          let currentTimeWeathercode: number = resp.hourly.weathercode[currentTimeWeatherIndex]

          this.latestWeatherCode = {
            date: new Date().getTime(),
            weatherCode: currentTimeWeathercode
          }

          return currentTimeWeathercode
        })
      })

    } catch (error) {
      console.error(error)
    }
    return "error is loged"
  }
}
