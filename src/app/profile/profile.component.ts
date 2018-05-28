import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PostService } from '../post.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private localSt: LocalStorageService, private router: Router, private postService: PostService) { }

  userProfile;
  posts;
  enroll;
  friends;
  requests;
  requestedTo;
  notifications;
  notify;
  selectedProfile;
  alFriend;
  alReq;
  loggedProfile;

  ngOnInit() {
    this.getUserProfile();
    var logged = this.localSt.retrieve('LoggedIn');
    this.selectedProfile = this.localSt.retrieve('selectedProfile');
    if(logged === false){
      this.router.navigate(['/login'])
    }
    this.getFriends();
    this.getNotific();
  }

  loggedInUser(){
    var temp = this.localSt.retrieve('selectedProfile');
    if(this.enroll === temp){
      return true;
    }else{
      return false;
    }
  }

  getUserProfile(){
    var enroll = this.localSt.retrieve('selectedProfile');
    var x = this.localSt.retrieve('userProfile').enroll;
    this.userService.getUserByEnrollment(enroll).subscribe(res => {
      this.userProfile = res;
      this.posts = this.userProfile.myPosts;
      this.userProfile.password = "";
    });
    this.userService.getUserByEnrollment(x).subscribe(res => {
      this.loggedProfile = res;
      this.posts = this.loggedProfile.myPosts;
      this.loggedProfile.password = "";
      this.localSt.store('userProfile', this.loggedProfile);
      this.friends = this.loggedProfile.friends.reverse();
      this.requestedTo = this.loggedProfile.requestedTo;
      this.enroll = this.loggedProfile.enroll;
      this.alFriend = this.alreadyFriend();
      this.alReq = this.alreadyReq();
      this.notify = this.loggedInUser();
    });
  }

  otherProfile(data){
    console.log("hheeyy")
    this.localSt.store('selectedProfile', data);
    this.router.navigate(['/profile']);
    window.location.reload();
  }

  logout(){
    this.localSt.store('LoggedIn', false);
    this.router.navigate(['/login']);
    this.localSt.clear('userProfile');
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  getPosts(){
    this.postService.getPost().subscribe(data => {
      this.posts = data;
      this.posts.reverse();
    });
  }

  toggleLike(post){
    if(this.alreadyLiked(post.likes)){
      this.doDislike(this.enroll, post._id);
      window.location.reload(true);
    }else{
      this.doLike(this.enroll, post._id);
      window.location.reload(true);
    }
  }

  doLike(enroll, id){
    this.postService.likePost(enroll, id).subscribe(res => {
      console.log(res);
    });
  }

  doDislike(enroll, id){
    this.postService.dislikePost(enroll, id).subscribe(res => {
      console.log(res);
    });
  }

  alreadyLiked(likes){
    var x = this.enroll;
    if(likes.includes(this.enroll.toString())){
      return true;
    }else{
      return false;
    }
  }

  sendReq(){
    var receiver = this.localSt.retrieve('selectedProfile');
    var sender = this.localSt.retrieve('userProfile').enroll;
    var data = { "sender":sender, "receiver": receiver };
    this.userService.sendReq(data).subscribe(res => {
      console.log("request sent");
      window.location.reload();
    });
  }

  acceptReq(enroll){
    var sender = this.localSt.retrieve('userProfile').enroll;
    var receiver = enroll;
    var data = { "sender":sender, "receiver": receiver };
    this.userService.acceptReq(data).subscribe(res => {
      console.log("reqest accepted");
      window.location.reload(true);
    });
  }

  cancelReq(enroll){
    var sender = this.localSt.retrieve('userProfile').enroll;
    var receiver = enroll;
    var data = { "sender":sender, "receiver": receiver };
    this.userService.cancelReq(data).subscribe(res => {
      console.log("reqest canceled");
      window.location.reload(true);
    });
  }

  cancelFriend(enroll){
    var sender = this.localSt.retrieve('userProfile').enroll;
    var receiver = enroll;
    if(enroll === ""){
      receiver = this.localSt.retrieve('selectedProfile');
    }
    var data = { "sender":sender, "receiver": receiver };
    this.userService.delReq(data).subscribe(res => {
      console.log("friend removed");
      window.location.reload(true);
    });
  }

  alreadyFriend(){
    if(this.friends.indexOf(this.selectedProfile) > -1){
      return true;
    }else{
      return false;
    }
  }

  alreadyReq(){
    if(this.requestedTo.indexOf(this.selectedProfile) > -1){
      return true;
    }else{
      return false;
    }
  }

  getFriends(){
    var sender = this.localSt.retrieve('userProfile').enroll;
    this.userService.getFriends(sender).subscribe(res => {
      this.friends = res;
    });
  }

  getNotific(){
    var data = this.localSt.retrieve('userProfile').enroll;
    this.userService.notification(data).subscribe(res => {
      this.notifications = res;
      console.log(res);
    });
  }

}
