import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  getWeatherData(cityName: string){
    this.http.get('https://weatherapi-com.p.rapidapi.com/current.json');
    headers: new HttpHeaders()
    .set(environment.XRapidAPIHostHeaderName, environment.XRapidAPIHostHeaderValue)
    .set(environment.XRapidAPIKeyHeaderName, environment.XRapidAPIKeyHeaderValue)
    params: new HttpParams()
    .set('q', cityName)
    .set('units', 'metrics')
    .set('mode','json')
  }
}
