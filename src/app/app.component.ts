import { Component } from '@angular/core';

import { AuthenticationService } from './_services/index';
import { User } from './_models/index';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'app works!';
  currentUser: User;
  constructor(private authenticationService: AuthenticationService) {
    authenticationService.logEvent$.subscribe(user => this.onLogEvent(user));
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  private onLogEvent(user : string):void {
    if(user){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      this.currentUser = null;
    }
  }
  
}
