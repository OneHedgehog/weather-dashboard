import { Injectable } from '@angular/core';

import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CitySuggestion} from '../models/city-suggestion';

enum SEARCH_SERVICE_METHODS {
  AUTOCOMPLETE = 'autocomplete'
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private static readonly LOCATIONS_URL = `${environment.API_URL}/locations/${environment.API_VERSION}/cities/`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getLocationsAutocomplete(query: string): Observable<CitySuggestion[]> {
    return this.httpClient.get(
      `${SearchService.LOCATIONS_URL}${SEARCH_SERVICE_METHODS.AUTOCOMPLETE}?q=${query}`
    ) as  Observable<CitySuggestion[]>;
  }
}
