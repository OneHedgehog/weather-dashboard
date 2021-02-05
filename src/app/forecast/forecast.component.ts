import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {CitySuggestion} from '../models/city-suggestion';
import {ForecastService} from '../services/forecast.service';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ForecastTimeComponent} from './forecast-time/forecast-time.component';

enum FORECAST_COLUMN_DEFS {
  DATE = 'date',
  MIN = 'min',
  MAX = 'max',
  ICON = 'icon',
  DAY = 'day',
  NIGHT = 'night',
  TIME_FORECAST = 'time'
}

interface SelectedCityChange extends SimpleChange {
  currentValue: CitySuggestion;
  previousValue: CitySuggestion;
}

interface ForecastComponentChanges extends SimpleChanges {
  selectedCity: SelectedCityChange;
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
  providers: [DatePipe]
})
export class ForecastComponent implements OnInit, OnChanges {
  @Input() selectedCity: CitySuggestion;

  public forecastColumnDefs = FORECAST_COLUMN_DEFS;
  public displayedColumns: string[] = [
    FORECAST_COLUMN_DEFS.DATE,
    FORECAST_COLUMN_DEFS.MIN,
    FORECAST_COLUMN_DEFS.MAX,
    FORECAST_COLUMN_DEFS.DAY,
    FORECAST_COLUMN_DEFS.NIGHT,
    FORECAST_COLUMN_DEFS.TIME_FORECAST
  ];

  public currentForecast$;

  constructor(
    private forecastService: ForecastService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(forecastComponentChanges: ForecastComponentChanges): void {
    console.log('out if');
    if (forecastComponentChanges.selectedCity && forecastComponentChanges.selectedCity.currentValue) {
      console.log('in if');
      const cityId: string = this.selectedCity.AdministrativeArea.ID;
      this.currentForecast$ = this.forecastService.getDaysForecast(cityId);
    }
  }

  public openDaysForecast(day): any {
    console.log('checl', day);
    this.dialog.open(ForecastTimeComponent, {
      data: 'dffd',
      width: '900px'
    });
  }
}
