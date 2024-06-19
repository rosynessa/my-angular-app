import { CommonModule } from '@angular/common';
import { Component,OnInit  } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { WeatherserviceService } from '../weatherservice.service';

@Component({
  selector: 'app-weatherinfo',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterModule,WeatherserviceService],
  templateUrl: './weatherinfo.component.html',
  styleUrl: './weatherinfo.component.css'
})
export class WeatherinfoComponent implements OnInit {


  ngOnInit(): void {
         
  }

  constructor(private weatherserviceService:WeatherserviceService){

    fetchWeather(city: string) {
      this.weatherService.getWeather(city).subscribe(data => {
        this.weatherData = data;
      });
  }
  }
}
