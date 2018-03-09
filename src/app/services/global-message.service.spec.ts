import { TestBed, inject } from '@angular/core/testing';

import { GlobalMessageService } from './global-message.service';

describe('GlobalMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalMessageService]
    });
  });

  it('should be created', inject([GlobalMessageService], (service: GlobalMessageService) => {
    expect(service).toBeTruthy();
  }));
});
