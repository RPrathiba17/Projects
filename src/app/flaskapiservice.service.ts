import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlaskapiserviceService {
  constructor(private httpClient: HttpClient) {}

  public postfile(file:any)
  {
    const formdata:FormData = new FormData();
    formdata.append('file',file);
    console.log(JSON.stringify(formdata));

    return this.httpClient.post('http://127.0.0.1:5000/upload',formdata);
  }
  public postfile1(file:any, periodicity:any, num:any)
  {
    const formdata:FormData = new FormData();
    formdata.append('file',file);
    formdata.append('periodicity',periodicity);
    formdata.append('Number', num);
    console.log(JSON.stringify(formdata));

    return this.httpClient.post('http://127.0.0.1:5000/predict',formdata);
  }
}
