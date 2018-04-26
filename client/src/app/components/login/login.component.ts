import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators,EmailValidator}  from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authForm: FormGroup;
  error:any={
    message:null,
  }
  constructor(private router: Router,private userservice: UserService) { }

  ngOnInit() {
  	this.authForm = new FormGroup({
    	'username': new FormControl('', Validators.required),
    	'password': new FormControl('', Validators.required),
    	
  	 })
  }
  onSubmit(authForm: FormGroup){
  	this.userservice.login(authForm.value).then((user)=>{
  		
  		let $data = user.json()
  		console.log('data', $data)
  		if($data.status == true){
  			this.userservice.store_user(user)
  		    this.router.navigate(['/home']);
  		}else{
  			this.error.message ='You have entered an invalid email or password';
	        setTimeout(()=>{
	            this.error.message = null;
	        },3000)
  		}
  		
  	}).catch((err)=>{
  		this.error.message ='You have entered an invalid email or password';
	    setTimeout(()=>{
	            this.error.message = null;
	    },3000)
  	})
  }

}
