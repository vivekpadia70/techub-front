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

  ngOnInit() {
    this.getUserProfile();
    var logged = this.localSt.retrieve('LoggedIn');
    var x = this.localSt.retrieve('userProfile');
    this.enroll = x.enroll;
    if(logged === false){
      this.router.navigate(['/login'])
    }
  }

  getUserProfile(){
    var enroll = this.localSt.retrieve('selectedProfile');
    this.userService.getUserByEnrollment(enroll).subscribe(res => {
      this.userProfile = res;
      this.posts = this.userProfile.myPosts;
      console.log(this.posts);
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
}
