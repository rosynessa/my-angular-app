import { Component, NgModule, OnInit } from '@angular/core';
import { WeatherserviceService } from '../weatherservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CitydetailsComponent } from '../citydetails/citydetails.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';


@Component({
  selector: 'app-weatherhistory',
  standalone: true,
  imports: [CommonModule, 
    FormsModule,
    RouterModule,
    CitydetailsComponent,
    MatDialogModule,
    MatButtonModule

  ],
  templateUrl: './weatherhistory.component.html',
  styleUrl: './weatherhistory.component.css'
})
export class WeatherhistoryComponent implements OnInit{

  favoriteCities: any[] = [];
  newFavoriteCity: string = '';
  errorMessage: string = '';
  backgroundImages:string[] = [
   
    'assets/desert.jpeg',
    'assets/night.jpeg',
    'assets/Landscape.jpeg',
    'assets/mantel.jpeg',
    'assets/mountain.jpeg',
    'assets/vector.jpeg',
    'assets/Flat.jpeg'

  ]

  constructor(
    private weatherserviceservice: WeatherserviceService,
    public Dialog:MatDialog
  ){}

  openDialog(title:string, message: string): void {
    const dialogRef = this.Dialog.open(MaterialDialogComponent, {
      width: '400px',
      data: {title, message}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit(): void {
    this.loadFavoriteCities();
      
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

  getRandomBackground(): string {
    const randomIndex = Math.floor(Math.random() * this.backgroundImages.length);
    return this.backgroundImages[randomIndex];
  }

}
