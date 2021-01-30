import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounce, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {SearchService} from './services/search.service';
import {CitySuggestion} from './models/city-suggestion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public citiesControl: FormControl = new FormControl();
  public options: string[] = ['One', 'Two', 'Three'];
  public filteredCities$: Observable<CitySuggestion[]>;

  public constructor(
    private searchService: SearchService
  ) {
  }

  ngOnInit(): void {
    this.filteredCities$ = this.citiesControl.valueChanges.pipe(
      switchMap((cityAutosuggestQuery: string) => this.searchService.getLocationsAutocomplete(cityAutosuggestQuery)),
      map((cities: CitySuggestion[]) => cities)
    );
  }
}
