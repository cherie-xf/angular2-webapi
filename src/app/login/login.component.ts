import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {

      authenticationService.logEvent$.subscribe(user => this.onLogEvent(user));

    }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }
  
  login() {
        this.loading = true;
        //this.authenticationService.login(this.model.username, this.model.password)
		this.authenticationService.login(this.model)
            .subscribe(
                data => {
                //this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

  private onLogEvent(user : string):void {
    if(user ){
      if(user === 'error'){
        this.alertService.error('current user not exist!');
        this.loading = false;
        }else {
          this.router.navigate(['/']);
        }
    } else {
    }
  }

}
