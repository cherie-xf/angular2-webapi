import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  private USER_URL = "http://zenwebapi.azurewebsites.net/UserApi";
  constructor(private http: Http) { }
  
   getUsers(): Observable<{}> {
        return this._http.get(this.USER_URL)
            .map((response: Response) => <any[]> response.json())
             .do(data => console.log('All: ' +  JSON.stringify(data)))
             .catch(this.handleError)
            ;
    }

  
  
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
