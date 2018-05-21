import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private localSt: LocalStorageService, private router: Router) { }

  userProfile;

  ngOnInit() {
    this.getUserProfile();
    var logged = this.localSt.retrieve('LoggedIn');
    if(logged === false){
      this.router.navigate(['/login'])
    }
  }

  getUserProfile(){
    var enroll = this.localSt.retrieve('selectedProfile');
    this.userService.getUserByEnrollment(enroll).subscribe(res => {
      this.userProfile = res;
      this.userProfile.password = "";
    });
  }

  logout(){
    this.localSt.store('LoggedIn', false);
    this.router.navigate(['/login']);
    this.localSt.clear('userProfile');
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

}
