import { User } from 'src/app/models/user';
import { AuthService } from '@auth0/auth0-angular';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptorService implements HttpInterceptor {
  email : string;
  constructor(private auth: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isAuthenticated$){
      return this.auth.user$.pipe(tap(),switchMap(user => {
        let currentUser = new User();
        currentUser.setUserFromAuthPic(user.picture);
        return next.handle(req.clone({ setHeaders: {'USERMAIL': currentUser.email}}));
      }));
    } else {
      return next.handle(req);
    }
  }
}
