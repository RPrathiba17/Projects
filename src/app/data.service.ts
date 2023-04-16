import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: any;

  constructor() { }

  setData(data: any){
    localStorage.setItem('resultData', JSON.stringify(data));
  }
}
