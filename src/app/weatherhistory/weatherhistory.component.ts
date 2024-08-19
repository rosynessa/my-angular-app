import { Component, OnInit } from '@angular/core';
import { WeatherserviceService } from '../weatherservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';
import { ConversionService } from '../conversion.service';

@Component({
  selector: 'app-weatherhistory',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './weatherhistory.component.html',
  styleUrls: ['./weatherhistory.component.css']
})
export class WeatherhistoryComponent implements OnInit {
  favoriteCities: any[] = [];
  newFavoriteCity: string = '';
  weatherData: any;
  iconUrl:string = '';
  city: string = 'Nairobi';
  isCelsius: boolean = true;
  hourlyData: any[] = [];


  

  constructor(
    private weatherserviceservice: WeatherserviceService,

    public Dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.city = params.get('city') || '';

      if (this.city) {
        this.getWeather();
      }
    }) 
    this.loadFavoriteCities();
    this.getForecastWeather();
    
  }


  getForecastWeather(): void {
    this.weatherserviceservice.getForecastWeather(this.city).subscribe((data: any) => {
      console.log('Forecast data:', data); // Add this line to inspect the data structure
      this.hourlyData = data.days[0]?.hours.map((hour: any) => ({
        ...hour,
        temp: hour.temp
      }));
    });
  }
  

    getWeather():void{
      this.weatherserviceservice.getWeather(this.city).subscribe({
        next:(data:any) => {
          this.weatherData = data;
          console.log(data);
          this.weatherData.main.temp = this.kelvinToCelsius(this.weatherData.main.temp);
          this.iconUrl = 'https://openweathermap.org/img/wn/' + this.weatherData.weather[0].icon + '@2x.png';
          

        },

        error:err =>{
          console.error('Error fetching weather data: ', err);
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
  


  openDialog(title: string, message: string, confirmation: boolean = false, showOkButton:boolean=false): void {
    const dialogRef = this.Dialog.open(MaterialDialogComponent, {
      width: '400px',
      data: { title, message, confirmation }
    });

    console.log('Dialog data:', { title, message, confirmation, showOkButton });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the confirmation result here if needed
        // Result will be true if confirmed
      }
    });
  }

  addFavoriteCity(): void {
    const userId = 1; // Replace with actual user ID
    const city = this.newFavoriteCity;

    if (!city.trim()) {
      this.openDialog('Error', 'Please enter a city name.');
      return;
    }

    // Check if city already exists
    if (this.favoriteCities.some(existingCity => existingCity.city === city)) {
      this.openDialog('Error', 'City is already added.');
      return;
    }

    this.weatherserviceservice.addFavoriteCity(userId, city)
      .subscribe({
        next: () => {
          this.loadFavoriteCities();
          this.newFavoriteCity = ''; // Clear the input after adding
          this.openDialog('Success', 'City added to favorites.');
        },
        error: err => {
          console.error('Error adding favorite city', err);
          this.openDialog('Error', 'Error adding city. Please try again.');
        }
      });
  }

  loadFavoriteCities(): void {
    const userId = 1; // Replace with actual user ID

    this.weatherserviceservice.getFavoriteCities(userId)
      .subscribe({
        next: (cities: any) => this.favoriteCities = cities,
        error: err => {
          console.error('Error loading favorite cities', err);
          this.openDialog('Error', 'Error loading favorite cities. Please try again.');
        }
      });
  }

  deleteCity(id: number): void {
    const dialogRef = this.Dialog.open(MaterialDialogComponent, {
      width: '400px',
      data: { title: 'Confirm Deletion', message: 'Are you sure you want to delete this city?', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed the deletion
        this.weatherserviceservice.deleteFavoriteCity(id)
          .subscribe({
            next: () => {
              this.loadFavoriteCities();
              this.openDialog('Success', 'City removed from favorites.');
            },
            error: err => {
              console.error('Error deleting favorite city', err);
              this.openDialog('Error', 'Error removing city. Please try again.');
            }
          });
      }
    });
  }
  getIcon(condition: string): string {
    return this.weatherserviceservice.getIcon(condition);
  }
 

   scrollLeft() {
    const container = document.querySelector('.forecast-hour-container') as HTMLElement;
    container.scrollBy({ left: -1000, behavior: 'smooth' });
  }

  scrollRight() {
    const container = document.querySelector('.forecast-hour-container') as HTMLElement;
    container.scrollBy({ left: 1000, behavior: 'smooth' });
  }

}
