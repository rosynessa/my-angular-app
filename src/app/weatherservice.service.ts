import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,} from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class WeatherserviceService {
  
apiKey = 'e081fa0e5d1faefa897dd283f78f0b3e';
foreCastKey = '7BHY5DJ48XZFDZULEZ6VMQLKN';
DailyKey =  '7BHY5DJ48XZFDZULEZ6VMQLKN';
apiURL = 'http://localhost:4201';

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
      return this.httpClient.post(`${this.apiURL}/saveWeather`, weatherData2);
    }

    // Method to retrieve weather history
    getWeatherHistory():Observable<any[]>{
      return this.httpClient.get<any[]>(`${this.apiURL}/weatherHistory`);
    }

    public getIcon(condition: string): string {
      switch (condition) {
        case 'clear-day':
        case 'clear-night':
          return 'wb_sunny';
        case 'rain':
          return 'umbrella';
        case 'snow':
          return 'ac_unit';
        case 'sleet':
          return 'grain';
        case 'wind':
          return 'toys';
        case 'fog':
          return 'blur_on';
        case 'cloudy':
          return 'wb_cloudy';
        case 'partly-cloudy-day':
        case 'partly-cloudy-night':
          return 'wb_cloudy';
        default:
          return 'wb_sunny';
      }
    }


    addFavoriteCity(userId: number, city: string): Observable<any> {
      return this.httpClient.post(`${this.apiURL}/addFavoriteCity`, { userId, city });
    }
  
    getFavoriteCities(userId: number): Observable<any> {
      return this.httpClient.get(`${this.apiURL}/favoriteCities/${userId}`);
    }

    deleteFavoriteCity(id: number): Observable<any> {
      return this.httpClient.delete(`${this.apiURL}/favoriteCities/${id}`);
    }
  }
    
  
