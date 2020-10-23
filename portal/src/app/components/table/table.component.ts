import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderState } from '../../states/order.state';
import { Select, Store } from '@ngxs/store';
import { Order } from '../../models/Order';
import { Observable } from 'rxjs';
import {
  GetOrders,
  SetSelectedOrder,
  CancelOrder,
} from '../../actions/order.actions';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;
  @Select(OrderState.getOrderList) private _orders$: Observable<Order[]>;

  dataSource = new MatTableDataSource<Order>([]);
  displayedColumns = ['id', 'name', 'state', 'actions'];

  constructor(private _store: Store, private _dialog: MatDialog) { }

  ngOnInit() {
    this._store.dispatch(new GetOrders());
    this.refresh();
  }

  cancelOrder(id: string) {
    this._store.dispatch(new CancelOrder(id));
  }

  refresh() {
    this._orders$.subscribe((orders) => {
      this.dataSource.sort = this._sort;
      this.dataSource.paginator = this._paginator;
      this.dataSource.data = orders;
    });
  }

  openDialog(payload: Order) {
    this._store.dispatch(new SetSelectedOrder(payload));
    this._dialog.open(DialogComponent, { data: payload });
  }
}
