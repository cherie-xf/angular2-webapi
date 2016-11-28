import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { UserComponent } from './user/index';
import { RoleComponent } from './role/index';
import { ActivityComponent } from './activity/index';
import { EventComponent } from './event/index';
import { AuthGuard } from './_guards/auth.guard';
 
const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'role', component: RoleComponent, canActivate: [AuthGuard] },
    { path: 'activity', component: ActivityComponent, canActivate: [AuthGuard] },
    { path: 'event', component: EventComponent, canActivate: [AuthGuard] },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);
