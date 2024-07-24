
import { Component, OnInit } from '@angular/core';
import { WeatherserviceService } from '../weatherservice.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citydetails',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './citydetails.component.html',
  styleUrl: './citydetails.component.css'
})
export class CitydetailsComponent implements OnInit {
  city: string = '';
  weatherData: any;
  isCelsius: boolean = true; 
  iconUrl: string = ''; 
  isLoading: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private weatherserviceservice: WeatherserviceService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.city = params.get('city') || ''; // Get city from route params
      if (this.city) {
        this.getWeather();
      }
    });
   
  }

  getWeather(): void {
    this.isLoading = true;
    this.weatherserviceservice.getWeather(this.city).subscribe((data: any) => {
      this.weatherData = data;
      console.log(data);
      this.weatherData.main.temp = this.kelvinToCelsius(this.weatherData.main.temp);
      this.iconUrl = 'https://openweathermap.org/img/wn/' +this.weatherData.weather[0].icon +'@2x.png';
      this.isLoading= false;
    }, error => {
      this.isLoading = false;
      console.error('Error fetching weather data:', error);
    });
  }

  kelvinToCelsius(tempKelvin: number): number {
    return tempKelvin - 273.15;
  }

  toggleTemperatureUnit(): void {
    if (this.weatherData) {
      this.isCelsius = !this.isCelsius;
      if (this.isCelsius) {
        this.weatherData.main.temp = this.kelvinToCelsius(this.weatherData.main.temp);
      } else {
        this.weatherData.main.temp = (this.weatherData.main.temp * 9/5) + 32;
      }
    }
  }




}
