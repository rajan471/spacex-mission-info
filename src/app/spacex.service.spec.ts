import { TestBed } from '@angular/core/testing';

import { SpacexService } from './spacex.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('SpacexService', () => {
  let service: SpacexService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(SpacexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have getMissions method', () => {
    expect(service.getMissions).toBeTruthy();
  });

  it('getMissions should return an observable', () => {
    const queryStr = '?limit=1';
    const sut = service.getMissions(queryStr);
    expect(sut).toBeInstanceOf(Observable);
  });
});
