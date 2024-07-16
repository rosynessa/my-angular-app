import { Component, NgModule, OnInit } from '@angular/core';
import { WeatherserviceService } from '../weatherservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weatherhistory',
  standalone: true,
  imports: [CommonModule, 
    FormsModule,

  ],
  templateUrl: './weatherhistory.component.html',
  styleUrl: './weatherhistory.component.css'
})
export class WeatherhistoryComponent implements OnInit{

  favoriteCities: any[] = [];
  newFavoriteCity: string = '';

  constructor(
    private weatherserviceservice: WeatherserviceService
  ){}

  ngOnInit(): void {
    this.loadFavoriteCities();
      
  }

  
  addFavoriteCity(): void {
    const userId = 1; // Replace with actual user ID
    const city = this.newFavoriteCity;

    this.weatherserviceservice.addFavoriteCity(userId, city)
      .subscribe(response => {
        this.loadFavoriteCities();
        this.newFavoriteCity = ''; // Clear the input after adding
      });
  }

  loadFavoriteCities(): void {
    const userId = 1; // Replace with actual user ID

    this.weatherserviceservice.getFavoriteCities(userId)
      .subscribe((cities: any) => {
        this.favoriteCities = cities;
      });
  }
  
  deleteCity(id: number): void {
    this.weatherserviceservice.deleteFavoriteCity(id).subscribe({
      next: () => this.loadFavoriteCities(),
      error: err => console.error('Error deleting favorite city', err)
    });
  }

}
