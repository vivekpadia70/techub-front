import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private localSt: LocalStorageService, private router: Router) { }
  x = "";
  confirm_pass="";
  user_cred = {
    enroll: 0,
    password: "",
    username: "",
    year: "",
    profile_pic: "",
    bio: "",
    social_links: []
  }
  ngOnInit() {
  }

  signup(){
    if((this.confirm_pass === this.user_cred.password) && this.x !=="" && this.user_cred.username !== ""){
      this.user_cred.enroll = parseInt(this.x);
      this.userService.signup(this.user_cred).subscribe(res => {
        console.log(res);
        if(res === true){
          this.localSt.store('LoggedIn', true);
          this.localSt.store('userProfile', this.user_cred);
          this.router.navigate(['/home']);
        }
      })
    }
  }
  getUrl()
  {
    return "url('../assets/collegeDroneShoot.jpg')";
  }
}
