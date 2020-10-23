import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { EventSourceService } from 'src/app/services/event-source.service';
import { map } from 'rxjs/operators';
import {
  SetSelectedOrder,
  AddOrder,
  UpdateOrderStatus,
} from 'src/app/actions/order.actions';
import { DialogComponent } from '../dialog/dialog.component';
import { OrderStatus } from 'src/app/enums/order-status.enum';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/services/order.service';
import { ORDERS_APP_NAME } from 'src/app/consts/consts';

@Component({
  selector: 'app-order',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  private _eventSubscription: Subscription;
  private _httpErrorSubscription: Subscription;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _store: Store,
    private _eventSourceService: EventSourceService,
    private _orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this._eventSubscription = this._eventSourceService
      .newObservable<string>(`/${ORDERS_APP_NAME}/sse`)
      .pipe(map((data) => JSON.parse(data)))
      .subscribe(
        (event) => this.handleEvent(event),
        (error) => {
          if (error) this.openSnackBar(error, 'red-snackbar');
        }
      );

    this._httpErrorSubscription = this._orderService.httpError$.subscribe(
      (error) => {
        if (error) this.openSnackBar(error, 'red-snackbar');
      }
    );
  }

  ngOnDestroy() {
    this._eventSubscription.unsubscribe();
    this._httpErrorSubscription.unsubscribe();
    this._snackBar.dismiss();
  }

  openDialog() {
    this._store.dispatch(new SetSelectedOrder(null));
    this._dialog.open(DialogComponent);
  }

  openSnackBar(message: string, className?: string) {
    this._snackBar.open(message, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: [className],
    });
  }

  handleEvent(event: any) {
    const { id } = event;
    switch (event.eventName) {
      case 'OrderCreatedEvent':
        const { name, email, state, created } = event;
        this._store
          .dispatch(new AddOrder({ id, name, email, state, created }))
          .subscribe(() => this.openSnackBar(`Order ${id} created.`));
        break;

      case 'OrderCancelledEvent':
        this._store
          .dispatch(new UpdateOrderStatus(OrderStatus.CANCELLED, id))
          .subscribe(() => this.openSnackBar(`Order ${id} cancelled.`));
        break;

      case 'OrderConfirmedEvent':
        this._store
          .dispatch(new UpdateOrderStatus(OrderStatus.CONFIRMED, id))
          .subscribe(() => this.openSnackBar(`Order ${id} confirmed.`));
        break;

      case 'OrderDeliveredEvent':
        this._store
          .dispatch(new UpdateOrderStatus(OrderStatus.DELIVERED, id))
          .subscribe(() => this.openSnackBar(`Order ${id} delivered.`));
        break;

      default:
        break;
    }
  }
}
