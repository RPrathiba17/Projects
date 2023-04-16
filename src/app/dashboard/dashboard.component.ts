import { Component, OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { FlaskapiserviceService } from '../flaskapiservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  rmse:any;
  mse:any;
  mape:any;
  mae:any;
  value:any;
  result:boolean=false;
  constructor(private dataService:DataService, private flaskapiService: FlaskapiserviceService){}
  ngOnInit(): void {
    this.result=true;
    this.value=localStorage.getItem('resultData')
    this.value=JSON.parse(this.value)
    if(this.value){
      console.log("Working")
      this.rmse=this.value['rmse'];
      this.mse=this.value['mse'];
      this.mape=this.value['mape'];
      this.mae=this.value['mae'];
    }
  }

}
