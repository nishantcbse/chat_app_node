import { Component,  OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './components/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  messages = [];
  message;
  constructor(private chatService:ChatService) { }

  ngOnInit() {
  	
  
  }
  
  ngOnDestroy() {
   this.chatService.unsubscribe();
  }

}
