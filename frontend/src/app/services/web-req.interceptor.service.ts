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
    console.log(req);
    /*
    return this.auth.isAuthenticated$.pipe(tap(), switchMap((loggedIn) => {
      if(loggedIn){
        this.auth.user$.pipe(tap(),switchMap(user => {
          let currentUser = new User();
          currentUser.setUserFromAuthPic(user.picture);
          console.log(currentUser.email)
          return next.handle(req.clone({ setHeaders: {'USER_EMAIL':currentUser.email}}));
        }))
      } else {
        return next.handle(req);
      }

    }))
    */


  }
}
