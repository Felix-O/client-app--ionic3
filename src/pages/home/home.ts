import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DoubleBindedVariable } from '../../models/doublebindedvariables';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  doubleBindedVariable = {} as DoubleBindedVariable;
  item = {} as Item;
  getVariable = [];

  constructor( public api: ApiProvider,
    public navCtrl: NavController) {
  }

  getData(){
    this.api.getRequest().subscribe(data => {
      this.getVariable = data;
      console.log(this.getVariable);
    });
  }

  postData(doubleBindedVariable: DoubleBindedVariable){
    let body = JSON.stringify({
      player : doubleBindedVariable.player,
      main : doubleBindedVariable.main,
      rank: doubleBindedVariable.rank
    });
    this.api.postRequest(body);
  }

  putData(doubleBindedVariable: DoubleBindedVariable){
    let body = JSON.stringify({
      id: doubleBindedVariable.id,
      player : doubleBindedVariable.player,
      main : doubleBindedVariable.main,
      rank: doubleBindedVariable.rank
    });
    this.api.putRequest(body);
  }

  deleteData(item: Item){
    let body = JSON.stringify({
      id: item._id
    });
    this.api.deleteRequest(body).then(this.getData());
  }

}
