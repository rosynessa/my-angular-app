import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppModule } from './app.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';


@Component({
  selector: 'app-root',
 standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
}
