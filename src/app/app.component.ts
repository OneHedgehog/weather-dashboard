import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map, switchMap, takeLast, takeUntil} from 'rxjs/operators';
import {SearchService} from './services/search.service';
import {CitySuggestion} from './models/city-suggestion';
import {Unsubscribe} from './abstract/unsubscribe';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends Unsubscribe implements OnInit, OnDestroy {
  public citiesControl: FormControl = new FormControl();
  public filteredCities$: Observable<CitySuggestion[]>;

  public selectedCity: CitySuggestion;
  public lastSelectedCities: CitySuggestion[] = [];

  public constructor(
    private searchService: SearchService
  ) {
    super();
  }

  ngOnInit(): void {
    this.filteredCities$ = this.citiesControl.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap((cityAutosuggestQuery: string): Observable<CitySuggestion[]> =>
        this.searchService.getLocationsAutocomplete(cityAutosuggestQuery)
      ),
      map((cities: CitySuggestion[]): CitySuggestion[] => {
        this.lastSelectedCities = cities;
        return cities;
      }),
      takeUntil(this.ngOnComponentDestroyed$)
    );
  }

  public onCitySelected($autocompleteSelectedEvent: MatAutocompleteSelectedEvent): void {
    const selectedValue: string = $autocompleteSelectedEvent.option.value;
    const selectedCityLocalizedName: string = selectedValue.split(' ')[1];

    this.selectedCity = this.lastSelectedCities.find((city: CitySuggestion) => {
      return city.AdministrativeArea.LocalizedName === selectedCityLocalizedName;
    });
  }
}
