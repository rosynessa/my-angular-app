import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { WeatherserviceService } from '../weatherservice.service';

@Component({
  selector: 'app-dailyforecast',
  standalone: true,
  imports: [WeatherserviceService],
  templateUrl: './dailyforecast.component.html',
  styleUrl: './dailyforecast.component.css'
})
export class DailyforecastComponent implements OnInit {
  title= 'daily forecast';
  city: string = 'Nairobi';
  dailyData:any;



constructor(private weatherserviceservice:WeatherserviceService){}

ngOnInit(): void{
  this.getDailyWeather();
}

getDailyWeather():void{
  this.weatherserviceservice.getDailyWeather(this.city).subscribe((data:any) =>{
    console.log(data);
    this.dailyData = data.days;
    console.log(this.dailyData);

  })
}
}