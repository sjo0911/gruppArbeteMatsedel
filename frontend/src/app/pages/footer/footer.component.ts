import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  admin : boolean = false;
  sub : Subscription;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.sub = this.auth.user$.subscribe((user) => {
      let currentUser = new User(user.picture);
      currentUser.permissions.forEach(permission => {
        if(permission === 'admin') {
          this.admin = true;
        }
      });
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
