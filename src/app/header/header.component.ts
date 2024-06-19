import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterLink, RouterModule } from '@angular/router';



@Component({
  selector: 'app-header',
  
 standalone:true,

 imports: [
  RouterModule,
  RouterLink,
  CommonModule, 
  FormsModule
 ],
 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{


  searchQuery: string=' ';

  
  ngOnInit(): void {
         
  }
  constructor(){ }

     

     onSearch(){
      if (this.searchQuery) {
        console.log('Searching for:', this.searchQuery);
      }
    }
  }

