import { Component, OnInit } from '@angular/core';
import { WeatherserviceService } from '../weatherservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weatherhistory',
  standalone: true,
  imports: [CommonModule,

  ],
  templateUrl: './weatherhistory.component.html',
  styleUrl: './weatherhistory.component.css'
})
export class WeatherhistoryComponent implements OnInit{

  weatherData2: any;
  history: any[] =[];

  constructor(
    private weatherserviceservice: WeatherserviceService
  ){}

  ngOnInit(): void {
      this.getWeatherHistory();
      
  }

  
 getWeatherHistory():void{
  this.weatherserviceservice.getWeatherHistory().subscribe(
   (data:any[]) =>{
     this.history = data;
    },
    error => {
      console.log("Error retrieving weather history", error);
    }
  );
 }


}
