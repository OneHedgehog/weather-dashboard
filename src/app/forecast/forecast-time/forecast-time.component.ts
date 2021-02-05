import { Component, OnInit } from '@angular/core';
import {ForecastService} from '../../services/forecast.service';
import {DatePipe} from '@angular/common';



enum FORECAST_COLUMN_DEFS {
  TIME = 'time',
  TEMPERATURE = 'temperature',
  COMMENT = 'comment',
  ICON = 'icon'
}

@Component({
  selector: 'app-forecast-time',
  templateUrl: './forecast-time.component.html',
  styleUrls: ['./forecast-time.component.css'],
  providers: [DatePipe]
})
export class ForecastTimeComponent implements OnInit {
  public forecastColumnDefs = FORECAST_COLUMN_DEFS;
  public displayedColumns: string[] = [
    FORECAST_COLUMN_DEFS.TIME,
    FORECAST_COLUMN_DEFS.TEMPERATURE,
    FORECAST_COLUMN_DEFS.COMMENT,
    FORECAST_COLUMN_DEFS.ICON
  ];
  public currentForecast$;

  constructor(
    private forecastService: ForecastService
  ) {

  }

  ngOnInit(): void {
    this.currentForecast$ = this.forecastService.getTimeForecast('CD');
  }

}
