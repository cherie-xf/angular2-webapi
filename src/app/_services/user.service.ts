import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/Rx';

@Injectable()
export class UserService {
  private USER_URL = "http://zenwebapi.azurewebsites.net/api/UserApi/";
  //private USER_URL = "http://localhost:5000/api/UserApi";
  constructor(private http: Http) { }
  /*
  getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
 
    create(user: User) {
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }
 
    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }
 
    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
 */
   getAll(): Observable<User[]> {
        return this.http.get(this.USER_URL)
            .map((response: Response) => <User[]> response.json())
             .do(data => console.log('All: ' +  JSON.stringify(data)))
             .catch(this.handleError)
            ;
    }
	
	getById(id: number): Observable<User> {
        return this.getAll()
            .map((user: User[]) => user.find(p => p.id === id));
    }
	
	create(user: User) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('add user : ' +  JSON.stringify(user));
        //return this.http.post(this.USER_URL, JSON.stringify(user), { headers: headers });
		return this.http.post(this.USER_URL, user, { headers: headers });

    }
	
	update(user: User) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('update user : ' +  JSON.stringify(user));
        return this.http.put(this.USER_URL + user.id, JSON.stringify(user), { headers: headers });
    }
	
	delete(id: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('update user : ' +  JSON.stringify(id));
        return this.http.delete(this.USER_URL + id, { headers: headers });
    }
	
	
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
	
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
