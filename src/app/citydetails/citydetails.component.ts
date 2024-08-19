
import { Component, OnInit } from '@angular/core';
import { WeatherserviceService } from '../weatherservice.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citydetails',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './citydetails.component.html',
  styleUrls: ['./citydetails.component.css']
})
export class CitydetailsComponent implements OnInit {
  city: string = '';
  weatherData: any;
  isCelsius: boolean = true;
  iconUrl: string = '';
  isLoading: boolean = false;
  hourlyData: any[] = [];
  WeatherHistory: any[] = [];
  latestWeatherRecord:any;

  constructor(
    private route: ActivatedRoute,
    private weatherserviceservice: WeatherserviceService
  ) {}

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
    this.weatherserviceservice.getWeather(this.city).subscribe({
      next: (data: any) => {
        this.weatherData = data;
        console.log(data);
        this.weatherData.main.temp = this.kelvinToCelsius(this.weatherData.main.temp);
        this.iconUrl = 'https://openweathermap.org/img/wn/' + this.weatherData.weather[0].icon + '@2x.png';
        
        // Fetch weather history for the city
        this.getWeatherHistory(this.city);
        
        // Optionally save the weather history here if needed
        this.saveWeatherHistory();
        
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        console.error('Error fetching weather data:', err);
      }
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

  saveWeatherHistory(): void {
    if (this.weatherData) {
      const temperature = this.weatherData.main.temp;
      const description = this.weatherData.weather[0].description;
      this.weatherserviceservice.saveWeatherHistory(this.city, temperature, description).subscribe({
        next: () => {
          console.log('Weather history saved');
        },
        error: err => {
          console.error('Error saving weather history:', err);
        }
      });
    }
  }

  getWeatherHistory(city: string): void {
    this.weatherserviceservice.getWeatherHistory(city).subscribe({
      next: (history: any[]) => {
        if(history.length > 0){

          history.sort((a,b) => new Date(b.searchTime).getTime() - new Date(a.searchTime).getTime());
          this.latestWeatherRecord = history[0];
        }else{
          this.latestWeatherRecord = null;
        }
        
        this.WeatherHistory = history.filter(item => item.city === city); // Filter history by the current city
      },
      error: err => {
        console.error('Error fetching weather history:', err);
      }
    });
  }
}
