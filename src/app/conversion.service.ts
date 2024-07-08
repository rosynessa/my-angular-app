import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  constructor() { }

  celciusToFahrenheit(celcius:number):number{
    return(celcius * 9/5) + 32;
  }
}
