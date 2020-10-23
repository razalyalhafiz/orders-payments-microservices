import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Observable } from "rxjs"
import { from } from "rxjs/internal/observable/from"
import { map } from "rxjs/operators"
import * as admin from "firebase-admin"

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): Observable<boolean> | boolean {
    const request = context.switchToHttp().getRequest()
    const jwt = request?.headers?.authorization?.replace("Bearer ", "")
    if (!jwt) return false

    return this.validateRequest(jwt).pipe(
      map((decodedToken) => {
        return !!decodedToken
      })
    )
  }

  validateRequest(jwt: string): Observable<admin.auth.DecodedIdToken> {
    return from(admin.auth().verifyIdToken(jwt))
  }
}
