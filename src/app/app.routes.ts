import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent},
    { path:'search', component:SearchComponent},
    { path:'details/:id', component:DetailsComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'user', component: UserComponent},
    { path: 'order/:id', component: OrderComponent },
    { path: '**', redirectTo: '' }
    
]
