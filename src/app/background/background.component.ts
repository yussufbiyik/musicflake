import { Component, OnInit } from '@angular/core';

declare var particlesJS:any;

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    new particlesJS()
    particlesJS.load('particles-js', '../assets/particles/winter.json', null)
  }

  house = Math.floor(Math.random() * 4);
}
