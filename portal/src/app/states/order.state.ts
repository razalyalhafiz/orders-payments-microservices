import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Order } from '../models/Order';
import {
  AddOrder,
  CancelOrder,
  GetOrders,
  SetSelectedOrder,
  UpdateOrderStatus,
} from '../actions/order.actions';
import { OrderService } from '../services/order.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export class OrderStateModel {
  orders: Order[];
  selectedOrder: Order;
}

@State<OrderStateModel>({
  name: 'orders',
  defaults: {
    orders: [],
    selectedOrder: null,
  },
})
@Injectable()
export class OrderState {
  constructor(private _orderService: OrderService) { }

  @Selector()
  static getOrderList(state: OrderStateModel) {
    return state.orders;
  }

  @Selector()
  static getSelectedOrder(state: OrderStateModel) {
    return state.selectedOrder;
  }

  @Action(GetOrders)
  getOrders({ getState, setState }: StateContext<OrderStateModel>) {
    return this._orderService.fetchOrders().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          orders: result,
        });
      })
    );
  }

  @Action(AddOrder)
  addOrder(
    { getState, patchState }: StateContext<OrderStateModel>,
    { payload }: AddOrder
  ) {
    const state = getState();
    patchState({
      orders: [...state.orders, payload],
    });
  }

  @Action(CancelOrder)
  cancelOrder(
    ctx: StateContext<OrderStateModel>,
    { orderId }: CancelOrder
  ) {
    this._orderService.cancelOrder(orderId).subscribe();
  }

  @Action(UpdateOrderStatus)
  updateOrderStatus(
    { getState, setState }: StateContext<OrderStateModel>,
    { payload, orderId }: UpdateOrderStatus
  ) {
    const state = getState();
    const orderList = [...state.orders];
    const orderIndex = orderList.findIndex((item) => item.id === orderId);
    orderList[orderIndex] = { ...orderList[orderIndex], state: payload };
    setState({
      ...state,
      orders: orderList,
    });
  }

  @Action(SetSelectedOrder)
  setSelectedOrder(
    { getState, setState }: StateContext<OrderStateModel>,
    { payload }: SetSelectedOrder
  ) {
    const state = getState();
    setState({
      ...state,
      selectedOrder: payload,
    });
  }
}
