import { CommonModule, DatePipe } from '@angular/common';
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
hourlyData:any[] = [];
dailyData:any[] = [];
unit: string = 'C';
isLoading: boolean=false;

constructor(private weatherserviceservice:WeatherserviceService){ }


  ngOnInit(): void{
   this.getWeather();
   this.getForecastWeather();
   this.getDailyWeather();
    
  }

  getWeather(): void{
    this.isLoading = true;
    this.weatherserviceservice.getWeather(this.city).subscribe((data: any) => {
      this.weatherData = data;
      this.convertDailyData();
      console.log(data); 
      this.weatherData.main.temp = this.kelvinToCelsius(this.weatherData.main.temp);
      this.isLoading=true;
    
    })
  }

  kelvinToCelsius(tempKelvin: number): number {
    return tempKelvin - 273.15;
  }

  kelvinToFahrenheit(tempKelvin: number):number{
    return (tempKelvin - 273.15) * 9 / 5 + 32;
  }

  getForecastWeather(): void{
    this.isLoading = true;
    this.weatherserviceservice.getForecastWeather(this.city).subscribe((data:any) => {
      this.hourlyData = data.days[0].hours;
      console.log(data.hourly);
      this.isLoading=true;
    })
  }
  
  
  getDailyWeather():void{
    this.isLoading = true;
    this.weatherserviceservice.getDailyWeather(this.city).subscribe((data:any) =>{
      console.log(data);
      this.dailyData = data.days;
      console.log(this.dailyData);
      this.isLoading=true;
     

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

  toggleUnit(unit:string): void{
    if (this.unit !== unit){
      this.unit = unit;
      this.convertWeatherData();
      this.convertForecastData();
      this.convertDailyData();

    }
  }

  convertWeatherData():void{
    if (this.unit === 'C'){
      this.weatherData.main.temp = this.kelvinToCelsius(this.weatherData.main.temp);
    }else{
      this.weatherData.main.temp = this.kelvinToFahrenheit(this.weatherData.main.temp);
    }
  }
  convertForecastData(): void {
    this.hourlyData.forEach(hour => {
      if (this.unit === 'C') {
        hour.temp = this.kelvinToCelsius(hour.temp);
      } else {
        hour.temp = this.kelvinToFahrenheit(hour.temp);
      }
    });
  }

    convertDailyData(): void {
    this.dailyData.forEach(day => {
      if (this.unit === 'C') {
        day.temp = this.kelvinToCelsius(day.temp);
        
      } else {
        day.temp = this.kelvinToFahrenheit(day.temp);
       
      }
    });
  }


}