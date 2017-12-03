//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http, Headers/**, Response/**/} from '@angular/http';
import 'rxjs/add/operator/map';

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
    return this.http.get(this.url + 'getData', this.setHeaders())
      .map(res => res.json());
  }

  postRequest(body: string){
    return this.http.post(this.url + 'postData' , body, this.setHeaders())
      .map(res => res.json());
  }

  async putRequest(body: string){
    await this.http.put(this.url + 'putData' , body, this.setHeaders())
      .map(res => res.json())
      .subscribe(data => {
        //console.log(data);
      });
  }

  async deleteRequest(body: string){
    await this.http.post(this.url + 'deleteData' , body, this.setHeaders())
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }

  setHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return {headers: headers};
  }

}
