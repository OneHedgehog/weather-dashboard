import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {SearchService} from './services/search.service';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppModule} from './app.module';
import {TestSearchService} from './tests/test-search.service';
import {By} from '@angular/platform-browser';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({selector: 'app-forecast', template: ''})
class ForecastStubComponent {}

let appComponent: AppComponent;
let appComponentFixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [
        AppComponent,
        ForecastStubComponent
      ],
      providers: [
        {
          provide: SearchService,
          useClass: TestSearchService
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        appComponentFixture = TestBed.createComponent(AppComponent);
        appComponent = appComponentFixture.componentInstance;
      });
  }));

  it('should create the app component', () => {
    expect(appComponent).not.toBeNull();
    expect(appComponent.citiesControl).not.toBeNull();
    expect(appComponent.lastSelectedCities.length).toEqual(0);
    expect(appComponent.filteredCities$).not.toBeNull();
    expect(appComponent.selectedCity).toBeFalsy();
  });


  it(`can get forecast location search input & correct autocomplete options`, () => {
    const inputElement = appComponentFixture.debugElement.query(By.css('input')); // Returns DebugElement
    expect(inputElement).not.toBeNull();
    appComponentFixture.detectChanges();

    inputElement.nativeElement.dispatchEvent(new Event('focusin'));
    inputElement.nativeElement.value = 'Ki';
    expect(appComponent.lastSelectedCities.length).toEqual(0);
    inputElement.nativeElement.dispatchEvent(new Event('input'));

    expect(appComponent.lastSelectedCities.length).toEqual(5);
    let matOptions = document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    expect(matOptions.length).toEqual(0);

    appComponentFixture.detectChanges();
    matOptions = document.querySelectorAll('mat-option');
    expect(matOptions.length).toEqual(5);


    const selectedString = matOptions[1].querySelector('span').innerHTML.trim();
    const fakeEvent: MatAutocompleteSelectedEvent = {
      option: {
        value: selectedString
      }
    } as MatAutocompleteSelectedEvent;

    expect(appComponent.selectedCity).toBeFalsy();
    appComponent.onCitySelected(fakeEvent);
    expect(appComponent.selectedCity).toBeTruthy();
  });

});
