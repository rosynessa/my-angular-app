import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterLink, RouterModule } from '@angular/router';
import { WeatherserviceService } from '../weatherservice.service';



@Component({
  selector: 'app-header',
  
 standalone:true,

 imports: [
  RouterModule,
  RouterLink,
  CommonModule, 
  FormsModule,
  WeatherserviceService,

 ],
 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() weatherSearch = new EventEmitter<{ lat:number, lon:number}>();
 

  latitude: number =0;
  longitude:number = 0;

  constructor(private weatherserviceservice:WeatherserviceService){ }



  onSubmit(){
    this.weatherSearch.emit({lat:this.latitude, lon:this.longitude})
  }
 

 


     

    
  }

