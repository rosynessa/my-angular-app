import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherserviceService } from '../weatherservice.service';
import { FormsModule } from '@angular/forms';
import { ConversionService } from '../conversion.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'homepage';
  city: string = 'Nairobi';
  weatherData: any;
  hourlyData: any[] = [];
  dailyData: any[] = [];
  isLoading: boolean = false;
  isCelsius: boolean = true;

  constructor(
    private weatherserviceservice: WeatherserviceService,
    private conversionservice: ConversionService
  ) { }

  ngOnInit(): void {
    this.getWeather();
    this.getForecastWeather();
    this.getDailyWeather();
  }

  getWeather(): void {
    this.isLoading = true;
    this.weatherserviceservice.getWeather(this.city).subscribe((data: any) => {
      this.weatherData = data;
      console.log(data);
      this.weatherData.main.temp = this.kelvinToCelsius(this.weatherData.main.temp);
      this.isLoading= false;
      this.saveWeatherHistory;
    }, error => {
      this.isLoading = false;
    });
  }

  kelvinToCelsius(tempKelvin: number): number {
    return tempKelvin - 273.15;
  }

  getForecastWeather(): void {
    this.isLoading = true;
    this.weatherserviceservice.getForecastWeather(this.city).subscribe((data: any) => {
      console.log(data.hourly);
      this.hourlyData = data.days[0].hours.map((hour: any) => ({
        ...hour,
        temp: hour.temp
      }));
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  getDailyWeather(): void {
    this.isLoading = true;
    this.weatherserviceservice.getDailyWeather(this.city).subscribe((data: any) => {
      console.log(data);
      this.dailyData = data.days.map((day: any) => ({
        ...day,
        temp: day.temp
      }));
      console.log(this.dailyData);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
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

  toggleTemperatureUnit(): void {
    this.isLoading = true;
    setTimeout(() => {
    this.isCelsius = !this.isCelsius;
    // Convert existing temperatures to the new unit
    this.weatherData.main.temp = this.getDisplayedTemperature(this.weatherData.main.temp);

    this.hourlyData = this.hourlyData.map(hour => ({
      ...hour,
      temp: this.getDisplayedTemperature(hour.temp)
    }));

    this.dailyData = this.dailyData.map(day => ({
      ...day,
      temp: this.getDisplayedTemperature(day.temp)
    }));
    this.isLoading = false;
  },500);
  }


  getDisplayedTemperature(temp: number): number {
    return this.isCelsius ? temp : this.conversionservice.celciusToFahrenheit(temp);
  
  }


  saveWeatherHistory(): void {
    const city = this.city;
    const temperature = this.weatherData.main.temp;
    const description = this.weatherData.weather[0].description;
    this.weatherserviceservice.saveWeatherHistory(city, temperature, description).subscribe(
      response => {
        console.log('Weather history saved successfully', response);
      },
      error => {
        console.error('Error saving weather history', error);
      }
    );
  }
}
