import { Routes } from '@angular/router';
import { WeatherserviceService } from './weatherservice.service';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DailyforecastComponent } from './dailyforecast/dailyforecast.component';

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
    path:'dailyforecast',
    component:DailyforecastComponent,
}





    



];