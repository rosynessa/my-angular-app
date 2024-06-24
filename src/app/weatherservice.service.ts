import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class WeatherserviceService {
  
apiKey = '66b2cf94bb6f33eb40d614bc6102a424';


  constructor(private httpClient: HttpClient) { }

 public getWeather(city:String){
  console.log(city)
  this.httpClient.get('https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}');
 }


  }

