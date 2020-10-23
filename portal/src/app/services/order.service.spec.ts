import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

const authStub: any = {
  auth: {
    getToken() {},
  },
};

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authStub }],
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
