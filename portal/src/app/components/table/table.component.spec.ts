import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './table.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NgxsModule, Store } from '@ngxs/store';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        NgxsModule.forRoot([]),
      ],
      providers: [{ provide: MatDialog, useValue: MatDialog }],
    }).compileComponents();

    store = TestBed.inject(Store);
    spyOn(store, 'select').and.returnValue(of(null));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
