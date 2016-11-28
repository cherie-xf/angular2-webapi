import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Event } from '../_models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/Rx';

@Injectable()
export class EventService {

  private EVENT_URL = "http://zenwebapi.azurewebsites.net/api/EventApi/";
  constructor(private http: Http) { }

   getAll(): Observable<Event[]> {
        return this.http.get(this.EVENT_URL)
            .map((response: Response) => <Event[]> response.json())
             .do(data => console.log('All: ' +  JSON.stringify(data)))
             .catch(this.handleError);
    }
	
	getById(id: number): Observable<Event> {
        return this.getAll()
            .map((event: Event[]) => event.find(p => p.eventId === id));
    }
	
	create(event: Event) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('add event : ' +  JSON.stringify(event));
        //return this.http.post(this.USER_URL, JSON.stringify(user), { headers: headers });
		return this.http.post(this.EVENT_URL, event, { headers: headers });

    }
	
	update(event: Event) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('update event : ' +  JSON.stringify(event));
        return this.http.put(this.EVENT_URL + event.eventId, JSON.stringify(event), { headers: headers });
    }
	
	delete(id: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('delete event : ' +  JSON.stringify(id));
        return this.http.delete(this.EVENT_URL + id, { headers: headers });
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
