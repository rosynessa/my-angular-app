import { Routes } from '@angular/router';
import { WeatherserviceService } from './weatherservice.service';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { WeatherhistoryComponent } from './weatherhistory/weatherhistory.component';
import { CitydetailsComponent } from './citydetails/citydetails.component';

export const routes: Routes = [

    // {
    //     path: 'header',
    //     component:HeaderComponent,
    // },
 
{
    path:'home',
    component:HomeComponent,
},

{
    path: 'history',
    component:WeatherhistoryComponent,
},

{
    path: 'city/:city',
    component:CitydetailsComponent,
    
},
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: '**', redirectTo: '/home' }



    



];