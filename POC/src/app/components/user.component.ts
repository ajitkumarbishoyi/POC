import { Component } from '@angular/core';
import { UserService } from '../service/user.service';


@Component({
selector:'userresponse',
templateUrl:'user.component.html',
//styleUrls: ['./app.component.css'],
providers:[UserService]

})
export class UserComponent {
   title = 'app works!';
   users;

   constructor(private userService: UserService) {
    userService.getUsers().subscribe(p=>this.users = p);
   }
}
