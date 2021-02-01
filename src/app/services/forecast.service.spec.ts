import { TestBed } from '@angular/core/testing';

import { ForecastService } from './forecast.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ForecastService', () => {
  let service: ForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
