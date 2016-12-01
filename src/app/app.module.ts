import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MyDatePickerModule } from 'mydatepicker';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

//custom
import { routing }        from './app.routing'

import { AlertComponent } from './_directives/alert/alert.component';

import { AlertService} from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { RoleService } from './_services/role.service';
import { ActivityService } from './_services/activity.service';
import { EventService } from './_services/event.service';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { EventComponent } from './event/event.component';
import { RoleComponent } from './role/role.component';
import { ActivityComponent } from './activity/activity.component';

@NgModule({
  declarations: [
    AppComponent,
    //custom
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    EventComponent,
    RoleComponent,
    ActivityComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	//custom
	Ng2DatetimePickerModule,
	routing
  ],
  providers: [
    AlertService,
	AuthGuard,
	AuthenticationService,
	UserService,
  RoleService,
  ActivityService,
  EventService,
	
	// providers used to create fake backend
     //   fakeBackendProvider,
    //    MockBackend,
    //    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
