import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';




@Component({
  selector: 'app-home',
  standalone: true,
  imports:[RouterModule,
    
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  

  ngOnInit(): void {
   
      
  }
  

  constructor(){ }

}
  

