import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

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
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { EventComponent } from './event/event.component';

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

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	//custom
	routing
  ],
  providers: [
    AlertService,
	AuthGuard,
	AuthenticationService,
	UserService,
	
	// providers used to create fake backend
     //   fakeBackendProvider,
    //    MockBackend,
    //    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
