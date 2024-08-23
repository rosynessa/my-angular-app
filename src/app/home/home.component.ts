import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherserviceService } from '../weatherservice.service';
import { FormsModule } from '@angular/forms';
import { ConversionService } from '../conversion.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitydetailsComponent } from '../citydetails/citydetails.component';

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
  iconUrl: string = '';
  userId: number = 1;
  favoriteCities: Set<string> = new Set();

  constructor(
    private weatherserviceservice: WeatherserviceService,
    private conversionservice: ConversionService,
    public dialog: MatDialog
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
      this.iconUrl = 'https://openweathermap.org/img/wn/' +this.weatherData.weather[0].icon +'@2x.png';
      this.isLoading= false;
      this.saveWeatherHistory();
    }, error => {
      this.isLoading = false;
    });
  }

  saveWeatherHistory():void{
    const city = this.city;
    const temperature = this.weatherData.main.temp;
    const description = this.weatherData.weather[0].description;
    this.weatherserviceservice.saveWeatherHistory(city, temperature, description).subscribe(
      response =>{
        console.log("Weather history saved successfully", response);
      },
      error =>{
        console.log("Error saving history", error);
      }
    );
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

  
  getIcon(condition: string): string {
    return this.weatherserviceservice.getIcon(condition);
  }

  addFavoriteCity(): void {
    if (this.favoriteCities.has(this.city)) {
    
      return;
    }

    this.weatherserviceservice.addFavoriteCity(1, this.city).subscribe(
      (response) => {
        console.log('City added to favorites:', response);
        this.favoriteCities.add(this.city);
        this.city = ''; // Clear the input after adding
      },
      (error) => {
        console.error('Error adding city to favorites:', error);
      }
    );
  }


  formatTime(datetime: string): string{
    let [hour, minute, second] = datetime.split(':').map(Number);
    const ampm = hour>= 12? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return  `${hour} ${ampm}`;
  


  }

  public getColor(condition: string): string {
    switch (condition) {
      case 'clear-day':
        return 'orange';
      case 'clear-night':
        return 'lightblue';
      case 'rain':
        return 'blue';
      case 'snow':
        return 'lightblue';
      case 'sleet':
        return 'gray';
      case 'wind':
        return 'lightgray';
      case 'fog':
        return 'darkgray';
      case 'cloudy':
        return 'gray';
      case 'partly-cloudy-day':
        return 'lightgray';
      case 'partly-cloudy-night':
        return 'white';
      default:
        return 'orange';
    }
  }
  

}
