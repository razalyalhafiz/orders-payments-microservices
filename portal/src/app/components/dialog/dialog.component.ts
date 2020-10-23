import { Component, Inject, Optional, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select } from '@ngxs/store';
import { OrderState } from '../../states/order.state';
import { Observable, Subscription } from 'rxjs';
import { Order } from '../../models/Order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit, OnDestroy {
  @Select(OrderState.getSelectedOrder) private _selectedOrder: Observable<
    Order
  >;
  orderForm: FormGroup;
  createOrder = false;
  private _formSubscription: Subscription = new Subscription();

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Order,
    public _dialogRef: MatDialogRef<DialogComponent>,
    private _fb: FormBuilder,
    private _ordersService: OrderService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this._formSubscription.add(
      this._selectedOrder.subscribe((order) => {
        if (order) {
          this.createOrder = false;
        } else {
          this.orderForm.reset();
          this.createOrder = true;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._formSubscription.unsubscribe();
  }

  createForm() {
    this.orderForm = this._fb.group({
      name: ['', Validators.required],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'change',
        },
      ],
    });
  }

  onSubmit() {
    this._formSubscription.add(
      (this._formSubscription = this._ordersService
        .addOrder(this.orderForm.value)
        .subscribe(
          () => this._dialogRef.close(),
          (error) => {
            this._ordersService.handleError(error);
            this._dialogRef.close();
          }
        ))
    );
  }
}
