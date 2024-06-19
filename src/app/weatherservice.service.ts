import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {
  private apiKey = '66b2cf94bb6f33eb40d614bc6102a42';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid';


  constructor(private http:HttpClient) { }

  getWeatherByCityName(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  getWeather(lat: number, lon:number): Observable<any> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}

