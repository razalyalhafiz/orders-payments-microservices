import { take } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ROUTE_LOGIN, ROUTE_ORDERS } from 'src/app/consts/consts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user$: Observable<firebase.User> = this._auth.user$;

  constructor(
    private readonly _auth: AuthService,
    private readonly _router: Router
  ) { }

  login() {
    this._auth
      .loginViaGoogle()
      .pipe(take(1))
      .subscribe(() => {
        this._router.navigate([ROUTE_ORDERS]);
      });
  }

  logout() {
    this._auth
      .logout()
      .pipe(take(1))
      .subscribe(() => {
        this._router.navigate([ROUTE_LOGIN]);
      });
  }
}
