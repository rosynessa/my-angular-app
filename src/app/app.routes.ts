import { Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { WeatherserviceService } from './weatherservice.service';

export const routes: Routes = [

    {
        path: 'header',
        component:HeaderComponent,
    },
 
{
    path:'home',
    component:HomeComponent,
},

{
    path:'weatherservice',
    component:WeatherserviceService,
}




    



];