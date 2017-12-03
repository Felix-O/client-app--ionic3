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
  public post: boolean = false;
  editId: any = null;
  playerModel: any = null;
  databasePostResponse: any = null;

  constructor( public api: ApiProvider,
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

    await this.api.postRequest(body).subscribe(data => {
      this.databasePostResponse = data;
    });

    doubleBindedVariable._id = null;
    doubleBindedVariable.player = null;
    doubleBindedVariable.main = null;
    doubleBindedVariable.rank = null;

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
    this.close();
    this.getData();
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

    if(this.remove = true)
    {
      this.remove = !this.remove;
    }

    this.edit = true;

  }

  removeData(doubleBindedVariable: DoubleBindedVariable){
    this.editId = doubleBindedVariable._id;

    if(this.edit = true)
    {
      this.edit = !this.edit;
    }

    this.remove = true;
  }

  postPostData(){
      this.post = !this.post;
  }

  close(){
    this.edit = false;
    this.remove = false;
    this.post = false;
  }

}
