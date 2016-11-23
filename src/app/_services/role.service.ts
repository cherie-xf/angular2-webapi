import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Role } from '../_models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/Rx';

@Injectable()
export class RoleService {

  private ROLE_URL = "http://zenwebapi.azurewebsites.net/api/RoleApi/";
  constructor(private http: Http) { }

  getAll(): Observable<Role[]> {
        return this.http.get(this.ROLE_URL)
            .map((response: Response) => <Role[]> response.json())
             .do(data => console.log('All: ' +  JSON.stringify(data)))
             .catch(this.handleError)
            ;
    }
	
	getById(id: number): Observable<Role> {
        return this.getAll()
            .map((role: Role[]) => role.find(p => p.roleId === id));
    }
	
	create(role: Role) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('add role : ' +  JSON.stringify(role));
        //return this.http.post(this.USER_URL, JSON.stringify(user), { headers: headers });
		return this.http.post(this.ROLE_URL, role, { headers: headers });

    }
	
	update(role: Role) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('update user : ' +  JSON.stringify(role));
        return this.http.put(this.ROLE_URL + role.roleId, JSON.stringify(role), { headers: headers });
    }
	
	delete(id: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('update user : ' +  JSON.stringify(id));
        return this.http.delete(this.ROLE_URL + id, { headers: headers });
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
