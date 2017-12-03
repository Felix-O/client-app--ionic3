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
  getVariable = [];
  public edit: boolean = false;
  public remove: boolean = false;
  editId: any = null;

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
      id: doubleBindedVariable._id,
      player : doubleBindedVariable.player,
      main : doubleBindedVariable.main,
      rank: doubleBindedVariable.rank
    });
    this.api.putRequest(body);

    this.editData(doubleBindedVariable);
  }

  deleteData(doubleBindedVariable: DoubleBindedVariable){
    let body = JSON.stringify({
      id: doubleBindedVariable._id
    });
    this.api.deleteRequest(body);
    this.getData();
  }

  editData(doubleBindedVariable: DoubleBindedVariable){

    this.editId = doubleBindedVariable._id;

    this.edit = !this.edit;
  }

  removeData(doubleBindedVariable: DoubleBindedVariable){
    this.editId = doubleBindedVariable._id;

    this.remove = !this.remove;
  }

}
