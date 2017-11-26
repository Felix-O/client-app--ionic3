//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http, Headers/**, Response/**/} from '@angular/http';
import 'rxjs/add/operator/map';
//import { Observable } from "rxjs/Observable";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  url: string = "https://fo-server--express.herokuapp.com/";


  constructor(public http: Http/*,
  public httpclient: HttpClient/**/) {
  }

  getRequest(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return this.http.get(this.url + 'getData', {headers: headers})
      .map(res => res.json());
  }

}
