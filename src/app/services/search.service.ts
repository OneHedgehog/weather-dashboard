import { Injectable } from '@angular/core';

import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CitySuggestion} from '../models/city-suggestion';

const mock = `[{"Version":1,"Key":"113487","Type":"City","Rank":10,"LocalizedName":"Kinshasa","Country":{"ID":"CD","LocalizedName":"Democratic Republic of the Congo"},"AdministrativeArea":{"ID":"KN","LocalizedName":"Kinshasa"}},{"Version":1,"Key":"223545","Type":"City","Rank":25,"LocalizedName":"Kitakyushu-shi","Country":{"ID":"JP","LocalizedName":"Japan"},"AdministrativeArea":{"ID":"40","LocalizedName":"Fukuoka"}},{"Version":1,"Key":"214971","Type":"City","Rank":30,"LocalizedName":"Kingston","Country":{"ID":"JM","LocalizedName":"Jamaica"},"AdministrativeArea":{"ID":"01","LocalizedName":"Kingston"}},{"Version":1,"Key":"293211","Type":"City","Rank":30,"LocalizedName":"Kigali","Country":{"ID":"RW","LocalizedName":"Rwanda"},"AdministrativeArea":{"ID":"01","LocalizedName":"City of Kigali"}},{"Version":1,"Key":"107131","Type":"City","Rank":31,"LocalizedName":"Kikwit","Country":{"ID":"CD","LocalizedName":"Democratic Republic of the Congo"},"AdministrativeArea":{"ID":"KU","LocalizedName":"Kwilu"}},{"Version":1,"Key":"110627","Type":"City","Rank":31,"LocalizedName":"Kisangani","Country":{"ID":"CD","LocalizedName":"Democratic Republic of the Congo"},"AdministrativeArea":{"ID":"TO","LocalizedName":"Tshopo"}},{"Version":1,"Key":"327337","Type":"City","Rank":31,"LocalizedName":"Kingston upon Hull","Country":{"ID":"GB","LocalizedName":"United Kingdom"},"AdministrativeArea":{"ID":"KHL","LocalizedName":"Kingston upon Hull"}},{"Version":1,"Key":"207046","Type":"City","Rank":31,"LocalizedName":"Kirkuk","Country":{"ID":"IQ","LocalizedName":"Iraq"},"AdministrativeArea":{"ID":"KI","LocalizedName":"Kirkuk"}},{"Version":1,"Key":"298428","Type":"City","Rank":31,"LocalizedName":"Kismayo","Country":{"ID":"SO","LocalizedName":"Somalia"},"AdministrativeArea":{"ID":"JH","LocalizedName":"Jubbada Hoose"}},{"Version":1,"Key":"3351988","Type":"City","Rank":35,"LocalizedName":"Kirari Suleman Nagar","Country":{"ID":"IN","LocalizedName":"India"},"AdministrativeArea":{"ID":"DL","LocalizedName":"Delhi"}}]`;

enum SEARCH_API_METHODS {
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
    return of(JSON.parse(mock));

    return this.httpClient.get(
      `${SearchService.LOCATIONS_URL}${SEARCH_API_METHODS.AUTOCOMPLETE}?q=${query}`
    ) as  Observable<CitySuggestion[]>;
  }
}
