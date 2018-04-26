import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';
@Injectable()
export class ChatService {
  private url;  
  private socket;
  TYPING_TIMER_LENGTH = 400; // ms
  connected =false;
  lastTypingTime:any;
  typing:any;
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  BASE_URL:string;
  constructor(private http: Http) {
    this.url = environment.Node_URL;
    this.BASE_URL = environment.BASE_URL;
    this.socket = io(this.url);
  
  }
  sendMessage(message){
  
    this.socket.emit('new_message', message);    
  }

  log_user(username){
   
    this.socket.emit('user_login', username);
    this.connected = true;
  }
  user_logged(){
      let observable = new Observable(observer => {
        
        this.socket.on('user_loggedIn', (data) => {
          observer.next(data);    
        });
      })     
      return observable;
  }
  istyping(data){
    return true;
  } 
  
  getMessages() {
    let observable = new Observable(observer => {
      
      this.socket.on('new_message', (data) => {
        observer.next(data);    
      });
    })     
    return observable;
  }
  getOldMessages() {
   let url: string = this.BASE_URL+'messages';
    return this.http.get(url, {headers: this.headers}).toPromise();
  }
  userTyping($data, $state){
    if($state){
      this.socket.emit('typing', $data);   
    }else{
      this.socket.emit('stop_typing', $data);   
    }
  }  
  onTyping() {
    let observable = new Observable(observer => {
      
      this.socket.on('typing', (data) => {
        observer.next(data);
        console.log('typing', data)    
      }); 
    })     
    return observable;
  }
  onStopTyping(){
     let observable = new Observable(observer => {
      
      this.socket.on('stop_typing', (data) => {
        observer.next(data);
        console.log('stop typing', data)    
      });
      // return () => {
      //   this.socket.disconnect();
      // };  
    })     
    return observable;
  }
  unsubscribe(){
     this.socket.emit('disconnect'); 
  }
   observableTyping ($data){
    if (this.connected) {
      if (!this.typing) {
        this.typing = true;
        this.userTyping($data, true);
      }
      this.lastTypingTime = (new Date()).getTime();

      setTimeout( ()=> {
        let typingTimer = (new Date()).getTime();
        let timeDiff = typingTimer - this.lastTypingTime;
        if (timeDiff >= this.TYPING_TIMER_LENGTH && this.typing) {
          this.userTyping($data, false);
          this.typing = false;
        }
      }, this.TYPING_TIMER_LENGTH);
    }
  }  
}