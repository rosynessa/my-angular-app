import { Component, NgModule, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { WeatherserviceService } from './weatherservice.service';



@Component({
  selector: 'app-root',
 standalone:true,
 imports:[
 
  RouterOutlet,
 RouterLink,
  HomeComponent,
  HeaderComponent,
  RouterLinkActive,
  WeatherserviceService
  
 ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  
  



  constructor(){ }

  ngOnInit(): void {
    
  }
 

title = 'my-angular-app';
}
