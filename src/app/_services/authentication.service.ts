import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Login, User } from '../_models/index';

@Injectable()
export class AuthenticationService {
    private LOGIN_URL = "http://zenwebapi.azurewebsites.net/api/LoginApi";
    public logEvent$: EventEmitter<string>;

    constructor(private http: Http) {
    this.logEvent$ = new EventEmitter<string>();
    }
  //login(username: string, password: string) {
  login(loginUser : Login) {
        //return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
		return this.http.post(this.LOGIN_URL, loginUser)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                //if (user && user.token) {
				if(user){
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.logEvent$.emit(user);
                }
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.logEvent$.emit('');
    }

}
