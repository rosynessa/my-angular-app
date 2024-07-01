import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DailyforecastComponent } from './dailyforecast/dailyforecast.component';
// import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
 standalone:true,
 imports:[
 
  RouterOutlet,
 RouterLink,
  HomeComponent,
  FormsModule,

  // HeaderComponent,
  RouterLinkActive,
  DailyforecastComponent
  

  
 ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  



  constructor(){ }

  ngOnInit(): void {
    
  }
 

title = 'weather app';
}
