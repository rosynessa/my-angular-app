import { CommonModule, DatePipe } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { WeatherserviceService } from '../weatherservice.service';
import { FormsModule } from '@angular/forms';

interface WeatherData {
  main: {
    temp: number;
  };
  name: string;
}

interface HourlyData {
  temp: number;
  // Add other properties if needed
}

interface DailyData {
  temp: number;
  // Add other properties if needed
}

export interface ForecastData {
  days: {
    hours: HourlyData[];
  }[];
}

export interface DailyForecastData {
  days: DailyData[];
}



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
hourlyData:any[] = [];
dailyData:any[] = [];
isLoading: boolean = false;
isCelcius: boolean= true;


constructor(private weatherserviceservice:WeatherserviceService){ }


  ngOnInit(): void{
   this.getWeather();
   this.getForecastWeather();
   this.getDailyWeather();
    
  }
  

  getWeather(): void{
   this.isLoading=true;
    this.weatherserviceservice.getWeather(this.city).subscribe((data: any) => {
      this.weatherData = data;
      console.log(data); 
      this.weatherData.main.temp = this.kelvinToCelsius(this.weatherData.main.temp);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
  }

  kelvinToCelsius(tempKelvin: number): number {
    return tempKelvin - 273.15;
  }


  getForecastWeather(): void{
   this.isLoading = true;
    this.weatherserviceservice.getForecastWeather(this.city).subscribe((data:any) => {
      this.hourlyData = data.days[0].hours.map((hour:HourlyData) => ({
        ...hour,
        temp: this.convertTemperature(this.kelvinToCelsius(hour.temp))
      }));
      console.log(data.hourly);
      
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
  }
  
  
  getDailyWeather():void{
    this.isLoading = true;
    this.weatherserviceservice.getDailyWeather(this.city).subscribe((data:any) =>{
      console.log(data);
      this.dailyData = data.days.map((day: DailyData) => ({
        ...day,
        temp: this.convertTemperature(this.kelvinToCelsius(day.temp))
      }));
      console.log(this.dailyData);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
    
  }

  scrollLeft() {
    const container = document.querySelector('.forecast-hour-container') as HTMLElement;
    container.scrollBy({ left: -1000, behavior: 'smooth' });
  }

  scrollRight() {
    const container = document.querySelector('.forecast-hour-container') as HTMLElement;
    container.scrollBy({ left: 1000, behavior: 'smooth' });
  }

  scrollLeft2() {
    const container = document.querySelector('.daily-container') as HTMLElement;
    container.scrollBy({ left: -1000, behavior: 'smooth' });
  }

  scrollRight2() {
    const container = document.querySelector('.daily-container') as HTMLElement;
    container.scrollBy({ left: 1000, behavior: 'smooth' });
  }

  toggleTemperatureUnit() {
    this.isLoading = true;
    setTimeout(() => {
      this.isCelcius = !this.isCelcius;
      // Convert existing temperatures to the new unit
      this.weatherData.main.temp = this.convertTemperature(this.weatherData.main.temp);

      this.hourlyData = this.hourlyData.map(hour => ({
        ...hour,
        temp: this.convertTemperature(hour.temp)
      }));

      this.dailyData = this.dailyData.map(day => ({
        ...day,
        temp: this.convertTemperature(day.temp)
      }));

      this.isLoading = false;
    }, 500);
  }

  convertTemperature(temp: number): number {
    if (this.isCelcius) {
      // Convert Kelvin to Celsius if necessary
      return temp;
    } else {
      // Convert Celsius to Fahrenheit rounded to 2 decimal points
      return parseFloat(((temp * 9 / 5) + 32).toFixed(2));
    }
  }}