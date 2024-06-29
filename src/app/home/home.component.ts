import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { WeatherserviceService } from '../weatherservice.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  imports:[RouterModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title= 'homepage';
  city: string = 'Nairobi';
weatherData:any;
hourlyData:any;
  


constructor(private weatherserviceservice:WeatherserviceService){ }


  ngOnInit(): void{
   this.getWeather();
   this.getForecastWeather();
    
  }

  getWeather(): void{
    this.weatherserviceservice.getWeather(this.city).subscribe((data: any) => {
      this.weatherData = data;
      console.log(data); 
      this.weatherData.main.temp = this.kelvinToCelsius(this.weatherData.main.temp);
    
    })
  }

  kelvinToCelsius(tempKelvin: number): number {
    return tempKelvin - 273.15;
  }

  getForecastWeather(): void{
    this.weatherserviceservice.getForecastWeather(this.city).subscribe((data:any) => {
      this.hourlyData = data.days[0].hours ;
      console.log(data.hourly);
    })
  }
  
  scrollLeft() {
    const container = document.querySelector('.forecast-container') as HTMLElement;
    container.scrollBy({ left: -100, behavior: 'smooth' });
  }

  scrollRight() {
    const container = document.querySelector('.forecast-container') as HTMLElement;
    container.scrollBy({ left: 100, behavior: 'smooth' });
  }
}