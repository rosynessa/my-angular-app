import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class WeatherserviceService {
  
apiKey = 'e081fa0e5d1faefa897dd283f78f0b3e';
foreCastKey = '7BHY5DJ48XZFDZULEZ6VMQLKN';
DailyKey =  '7BHY5DJ48XZFDZULEZ6VMQLKN';
apiURL = 'http://localhost:4201/saveWeather';
baseURL = 'http://localhost:4201/weatherHistory';


  constructor(private httpClient: HttpClient) { }

 public getWeather(city:String): Observable<any>{
  console.log(city)
  return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`);
 }

 public getForecastWeather(city:String): Observable<any>{
  console.log(city)
  return this.httpClient.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${this.foreCastKey}&contentType=json`);

  }

  public getDailyWeather(city:String): Observable<any>{
    console.log(city)
    return this.httpClient.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days&key=${this.DailyKey}&contentType=json`);
    }

     // Method to save weather history
    saveWeatherHistory(city: string, temperature: number, description: string): Observable<any>{

      const weatherData2 = {city, temperature, description};
      return this.httpClient.post(`${this.apiURL}`, weatherData2);
    }

    // Method to retrieve weather history
    getWeatherHistory():Observable<any[]>{
      return this.httpClient.get<any[]>(`${this.baseURL}`);
    }

}