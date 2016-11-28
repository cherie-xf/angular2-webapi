import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Activity } from '../_models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/Rx';

@Injectable()
export class ActivityService {

  private ACTIVITY_URL = "http://zenwebapi.azurewebsites.net/api/ActivityApi/";
  constructor(private http: Http) { }

   getAll(): Observable<Activity[]> {
        return this.http.get(this.ACTIVITY_URL)
            .map((response: Response) => <Activity[]> response.json())
             .do(data => console.log('All: ' +  JSON.stringify(data)))
             .catch(this.handleError);
    }
	
	getById(id: number): Observable<Activity> {
        return this.getAll()
            .map((activity: Activity[]) => activity.find(p => p.activityId === id));
    }
	
	create(activity: Activity) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('add activity : ' +  JSON.stringify(activity));
		return this.http.post(this.ACTIVITY_URL, activity, { headers: headers });
    }
	
	update(activity: Activity) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('update activity : ' +  JSON.stringify(activity));
        return this.http.put(this.ACTIVITY_URL + activity.activityId, JSON.stringify(activity), { headers: headers });
    }
	
	delete(id: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('update activity : ' +  JSON.stringify(id));
        return this.http.delete(this.ACTIVITY_URL + id, { headers: headers });
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
