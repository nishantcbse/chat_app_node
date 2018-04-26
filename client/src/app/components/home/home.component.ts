import { Component, OnInit, HostListener,AfterViewInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl,Validators}   from '@angular/forms';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls:[ './home.component.css' ]
})
export class HomePageComponent implements OnInit {
  todos:any[] = [];
  chats:any[]=[];
  istyping:boolean= false
  typing_user:any
  private chatmsgForm: FormGroup;
  user:any
  currentConnection:any={
    name:null
  }
  placeholder_img='../../../assets/images/im_placeholder_profile.png'
  constructor(private userservice:UserService, private chatService:ChatService) { 
  	this.userservice.get_user();

  	this.userservice.currentUser.subscribe(user => this.user = user);
  	this.chatService.log_user(this.user)

 }

  ngOnInit(): void {
  	this.chatmsgForm = new FormGroup({
    	'text': new FormControl(' ', Validators.required),
     
  	 })
  	this.chatService.getOldMessages().then(message =>this.chats = message.json().data)
    this.chatService.getMessages().subscribe(message => {
      this.chats.push(message);
     
    })
      
    this.chatService.onTyping().subscribe($data => {

        if(this.chatService.istyping($data)){
          this.currentConnection = $data
            this.istyping = true;
            this.typing_user = this.currentConnection.name;
        }
    })
    this.chatService.onStopTyping().subscribe($data => {
      if(this.chatService.istyping($data)){
        this.istyping = false;
      }
      
    })
    this.chatService.user_logged().subscribe(data=>{
       console.log('user join', data)
    })
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      document.getElementById("loader").style.display ='none'

      document.getElementsByClassName("div_container")[0].style.display ='block'
    }, 2000);
  }
  onSubmit(chatmsgForm: FormGroup): void{
    let text = chatmsgForm.value.text;
    let img = '../../../assets/images/im_placeholder_profile.png'
    let message ={position:Date.now(), username: this.user.username, message:text, pic:img, name:this.user.name}
    this.chats.push(message);
    this.chatService.sendMessage(message);
    this.chatmsgForm.reset();
  }
  @HostListener('document:input', ['$event.target'])
  public onClick(e) {
        this.chatService.observableTyping({'user':this.user.name})
  }

}
