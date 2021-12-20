import { TestBed } from '@angular/core/testing';

import { AzuraCastApiService } from './azura-cast-api.service';

describe('NowPlayingService', () => {
  let service: AzuraCastApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzuraCastApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
