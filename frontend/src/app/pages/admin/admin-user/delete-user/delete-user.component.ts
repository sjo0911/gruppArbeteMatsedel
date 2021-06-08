import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Alert } from 'src/assets/alert';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  NameOfUserToDelete: string;
  $users : Observable<any>;
  userToDeleteId: string='';
  sub:Subscription[];



  constructor( private userService: UserService, private alert: Alert) {
    this.sub=[];

  }

  ngOnInit(): void {
    this.NameOfUserToDelete= "Välja användare att ta bort";
    this.$users= this.userService.getUsers();


  }
  UserToDelete(user: User){
      this.NameOfUserToDelete=user.email;
      this.userToDeleteId=user._id;

  }
  deleteUser(){
    if(this.userToDeleteId===''){
      this.alert.showAlert('', 'Du måste välja en användare att ta bort!', 'warning');
    }else{
      let subscriptions: Subscription = this.userService.deleteUser(this.userToDeleteId).subscribe(()=>{

      });
      this.sub.push(subscriptions);
      this.alert.showAlertAndUpdatePage('Borttagen!', 'Användare har blivit borttagen.', 'success');
    }
  }

}
