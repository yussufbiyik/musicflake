import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service' 
declare var particlesJS:any;

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    new particlesJS()
    particlesJS.load('particles-js', '../assets/particles/winter.json', null)
  }

  house = Math.floor(Math.random() * 4)

  weatherCode = this.weatherService.getWeatherCode()
  
  map = this.weatherService.mapWeatherCode(Number(this.weatherCode));
}
