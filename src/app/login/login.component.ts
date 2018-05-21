import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, public router: Router, private localSt: LocalStorageService) { }
  x = "";
  wait = 1;
  user_cred = {enroll: 0, password: ""};


  ngOnInit() {
  }

  login(){
    this.user_cred.enroll = parseInt(this.x);
    this.userService.login(this.user_cred).subscribe(data => {
      if(data === false){
        this.router.navigate(['/signup']);
      }
      else{
        this.localSt.store('LoggedIn', true);
        this.localSt.store('userProfile', data);
        this.router.navigate(['/home']);
      }
    }, error => console.log(error));
  }
  getUrl()
  {
    return "url('../assets/collegeDroneShoot.jpg')";
  }
}
