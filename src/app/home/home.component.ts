import { CommonModule } from '@angular/common';
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
  city!: string;
weatherData:any;
  


constructor(private weatherserviceservice:WeatherserviceService){ }


  ngOnInit(): void{
   this.city = 'Nairobi'
    
  }

  getWeather(){
    this.weatherserviceservice.getWeather(this.city).subscribe((data: any) => {
      this.weatherData = data;
      console.log(data); 
    })
  }
}