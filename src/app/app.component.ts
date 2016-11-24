import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
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
  nav : any;
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
  ) {
    authenticationService.logEvent$.subscribe(user => this.onLogEvent(user));
	  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    /*
    this.route.params.subscribe(params => {
      this.nav = params['id']; // 
    });
    */
    this.nav = this.route.url;
  }

  private onLogEvent(user : string):void {
    if(user){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      this.currentUser = null;
    }
  }
  
}
