import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  cityName: string = 'Madurai';
  WeatherData: any;
  constructor(private http: HttpClient){}
  ngOnInit() {
    this.WeatherData = {
      main: {},
      isDay: true,
    };

    this.getWeatherData(this.cityName);
    this.cityName = '';
    console.log(this.WeatherData);
  }
  onSubmit() {
    this.getWeatherData(this.cityName);
  }
  getWeatherData(cityName: string) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        cityName +
        '&appid=4f57132ea1df3fb6db3e4c9084ab1315'
    )
      .then((response) => response.json())
      .then((data) => {
        this.setWeatherData(data);
        console.log(data);
      });
  }
  setWeatherData(data: any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }
}
