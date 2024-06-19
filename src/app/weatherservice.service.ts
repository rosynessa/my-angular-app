import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {
  
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid';



  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: number, lon: number){
    const params={

      lat:lat,
      lon:lon,
      units:'metric',
      appid: '66b2cf94bb6f33eb40d614bc6102a424'
      
    };

    return this.http.get(this.apiUrl, {params})
  }
}
