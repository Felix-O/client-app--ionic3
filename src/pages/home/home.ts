import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http, Headers/**, Response/**/} from '@angular/http';
import 'rxjs/add/operator/map';
//import { Observable } from "rxjs/Observable";

import { DoubleBindedVariable } from '../../models/doublebindedvariables';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  url: string = "https://fo-server--express.herokuapp.com/";
  doubleBindedVariable = {} as DoubleBindedVariable;
  getVariable = [];

  constructor( public api: ApiProvider,
    public http: Http,
    public navCtrl: NavController) {
  }

  getData(){
    this.api.getRequest().subscribe(data => {
      this.getVariable = data;
      //console.log(this.getVariable);
    });
  }

  async postData(doubleBindedVariable: DoubleBindedVariable){

    let body = JSON.stringify({
      player : doubleBindedVariable.player,
      main : doubleBindedVariable.main,
      rank: doubleBindedVariable.rank
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    await this.http.post(this.url + 'postData' , body, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        //console.log(data);
      });
  }

}
