import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators,EmailValidator}  from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 private authForm: FormGroup;
  error:any={
    message:null,
  }
  xsuccess:any={
    message:null,
  }
  constructor(private router: Router,private userservice: UserService) { }

  ngOnInit() {
  	this.authForm = new FormGroup({
  		'name': new FormControl('', Validators.required),
    	'username': new FormControl('', Validators.required),
    	'password': new FormControl('', Validators.required),
    	
  	 })
  }
  onSubmit(authForm: FormGroup){
  	this.userservice.register(authForm.value).then((user)=>{
  		let $data = user.json()
  		if($data.status == true){
  			this.xsuccess.message ='You have registered successfully!'
  			this.authForm.reset();
  			setTimeout(()=>{
	            this.xsuccess.message = null;
	        },3000)
  		}else{
  			this.error.message =$data.msg;
	        setTimeout(()=>{
	            this.error.message = null;
	        },3000)
  		}
  		
  	}).catch((err)=>{
  		this.error.message ='Registartion was unsuccessfully';
	    setTimeout(()=>{
	            this.error.message = null;
	    },3000)
  	})
  }

}
