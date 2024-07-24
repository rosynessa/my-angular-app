import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WeatherhistoryComponent } from './weatherhistory/weatherhistory.component';
import { CitydetailsComponent } from './citydetails/citydetails.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
 standalone:true,
 imports:[
 
  RouterOutlet,
 RouterLink,
  HomeComponent,
  FormsModule,
  WeatherhistoryComponent,
  CitydetailsComponent,
  MatDialogModule,
  MatButtonModule,
  RouterLinkActive,

  
  

  
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
