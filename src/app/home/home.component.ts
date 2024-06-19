import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { WeatherserviceService } from '../weatherservice.service';




@Component({
  selector: 'app-home',
  standalone: true,
  imports:[RouterModule,
    
    CommonModule,
    WeatherserviceService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  weatherData: any;
  constructor(private weatherserviceservice:WeatherserviceService){ }


  ngOnInit(): void {
   
    this.getWeatherByCityName('Madrid'); 
  }

  onSearchCity(city: string): void {
    this.weatherserviceservice.getWeatherByCityName(city).subscribe(
      data => {
        this.weatherData = data;
        console.log('Weather Data:', this.weatherData);
      },
      error => {
        console.error('Error fetching weather data', error);
      }
    );
  }
}

 
  

