import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/app-material.module';
import { EventSourceService } from 'src/app/services/event-source.service';
import { OrderService } from 'src/app/services/order.service';
import { OrdersComponent } from './orders.component';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let authStub: any = {};
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersComponent],
      imports: [
        AppMaterialModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([]),
      ],
      providers: [
        EventSourceService,
        OrderService,
        { provide: AngularFireAuth, useValue: authStub },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.returnValue(of(null));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
