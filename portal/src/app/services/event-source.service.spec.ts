import { TestBed } from '@angular/core/testing';

import { EventSourceService } from './event-source.service';

describe('EventSourceService', () => {
  let service: EventSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
