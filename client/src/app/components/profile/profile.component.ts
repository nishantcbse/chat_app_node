import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators,EmailValidator}   from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private editForm: FormGroup;
  private editPForm: FormGroup;
  private user:any={
  };
  private placeholder_img:string ='../../../assets/images/im_placeholder_profile.png';
  private image:string;
  private headers = new Headers({'Content-Type': 'application/json'})
  img_uploaded:string;
  errors_state=false;
  erros=[];
  current_password= false
  new_password= false
  confirm_password= false
  constructor(private _http: Http, private router: Router, private userservice: UserService, private alertService: AlertService) { }

  ngOnInit() {
  	this.userservice.get_user()
  	this.userservice.currentUser.subscribe(user => this.user = user)
  	this.initForm()
  }

  initForm(){
   	this.editForm = new FormGroup({
          'name': new FormControl('', Validators.required),
          'username': new FormControl('', Validators.required),
          'img': new FormControl(''),
    })

  	this.editForm.controls['name'].setValue(this.user.name)
  	this.editForm.controls['username'].setValue(this.user.username)
  	this.editPForm = new FormGroup({
          'current_password': new FormControl('', Validators.required),
          'new_password': new FormControl('', [Validators.required, Validators.minLength(6)]),
          'confirm_password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }
 

  onSubmit(editForm: FormGroup){
  	this.user.name=editForm.value.name;
    let $data ={
      username:this.user.username,
      name:editForm.value.name,
    }
    this.userservice.update_details($data).then((data)=>{
       data = data.json()
     
      if(data.status){

        this.userservice.getUser({username:this.user.username}).then(($user)=>{
          
           this.user.name = $user.json().data.name
          this.userservice.updateUser(this.user)
        });
        $('#img').val('');
         this.alertService.success('Personal Information has been updated');
       }else{
         this.alertService.error(data.erros);
       }
      
    }).catch((err)=>{
     
    })

  }
  UpdatePassword(editPForm: FormGroup){
    this.erros=[];
    this.current_password=false
    this.new_password=false
    this.confirm_password=false
    let $data = {
      new_password:editPForm.value.new_password, 
      current_password:editPForm.value.current_password,
      confirm_password:editPForm.value.confirm_password,
      username:this.user.username
    }
    this.userservice.changaPassword($data).then((data)=>{
      data = data.json()
      if(data.status){
        this.editPForm.reset()
         this.alertService.success('Password has been updated', true);
       }else{
          this.erros = data.erros
          this.current_password=this.erros.hasOwnProperty('current_password')
          this.new_password=this.erros.hasOwnProperty('new_password')
          this.confirm_password=this.erros.hasOwnProperty('confirm_password')
       }
      
    }).catch((err)=>{
      
    })
   
  }
  file_upload(elm){
    this.image = elm.target.files;
    let tag = URL.createObjectURL(elm.target.files[0])
    let img = this.userservice.getimage(tag);
    // this.user.img = this.img_uploaded
    $('.upload_img').attr('src', tag).show()
  }
  logout(){
  	this.userservice.logout();
  }


}
