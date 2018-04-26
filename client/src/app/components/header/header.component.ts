import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private user:any={
    img:'../../../assets/images/im_placeholder_profile.png'
  };
  router:Router;
  constructor(private _router:Router, private userservice: UserService) { 
      this.router = _router;

  }

  ngOnInit() {
  	
  }
  logout(){
    this.userservice.logout()
  }
  route_active(link:String){

    if(this.router.url == link){
      return true;
    }else{
      return false;
    }
  }

}
