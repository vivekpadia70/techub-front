import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostService, private localSt: LocalStorageService, private router: Router) { }
  content="";
  enroll;
  posts;

  ngOnInit() {
    var logged = this.localSt.retrieve('LoggedIn');
    var userProfile = this.localSt.retrieve('userProfile');
    if(logged === false){
      this.router.navigate(['/login'])
    }
    if(userProfile){
      this.enroll = userProfile.enroll;
    }
    document.getElementById("post_content").focus();
    this.getPosts();
  }

  post(){
    if(this.content !== "" ){
      var post = {content: this.content, owner_enroll: this.enroll, like: 0};
      this.postService.sendPost(post).subscribe(data => {
        console.log(data);
        window.location.reload(true);
      });
    }
  }

  logout(){
    this.localSt.store('LoggedIn', false);
    this.router.navigate(['/login']);
    this.localSt.clear('userProfile');
  }

  getUrl()
  {
    return "url('../assets/campus.jpeg')";
  }

  getPosts(){
    this.postService.getPost().subscribe(data => {
      this.posts = data;
      this.posts.reverse();
    });
  }

  myProfile(){
    var data = this.enroll;
    this.router.navigate(['/profile']);
    this.localSt.store('selectedProfile', data);
  }

  otherProfile(data){
    if(data === this.enroll){
      this.myProfile();
    }
    this.localSt.store('selectedProfile', data);
    this.router.navigate(['/profile']);
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
