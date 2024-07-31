import { Component, OnInit } from '@angular/core';
import { WeatherserviceService } from '../weatherservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CitydetailsComponent } from '../citydetails/citydetails.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';

@Component({
  selector: 'app-weatherhistory',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CitydetailsComponent, MatDialogModule, MatButtonModule],
  templateUrl: './weatherhistory.component.html',
  styleUrls: ['./weatherhistory.component.css']
})
export class WeatherhistoryComponent implements OnInit {
  favoriteCities: any[] = [];
  newFavoriteCity: string = '';
  backgroundImages: string[] = [
    'assets/desert.jpeg',
    'assets/night.jpeg',
    'assets/Landscape.jpeg',
    'assets/mantel.jpeg',
    'assets/mountain.jpeg',
    'assets/vector.jpeg',
    'assets/Flat.jpeg'
  ];

  mainImage: string[]=[
    'assets/download.jpeg'
  ]


  constructor(
    private weatherserviceservice: WeatherserviceService,
    public Dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadFavoriteCities();
  }

  openDialog(title: string, message: string, confirmation: boolean = false): void {
    const dialogRef = this.Dialog.open(MaterialDialogComponent, {
      width: '400px',
      data: { title, message, confirmation }
    });

    console.log('Dialog data:', { title, message, confirmation });
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

  getRandomBackground(): string {
    const randomIndex = Math.floor(Math.random() * this.backgroundImages.length);
    return this.backgroundImages[randomIndex];
  }
}
