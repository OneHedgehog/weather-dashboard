import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastTimeComponent } from './forecast-time.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ForecastTimeComponent', () => {
  let component: ForecastTimeComponent;
  let fixture: ComponentFixture<ForecastTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastTimeComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
