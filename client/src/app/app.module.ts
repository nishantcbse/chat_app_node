import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home/home.component';

import { AppRoutingModule } from './app-routing.module';
import { ChatService } from './components/services/chat.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { AlertService } from './components/services/alert.service';
import { UserService } from './components/services/user.service';
import { AlertComponent } from './components/alert/alert.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { ChatTimeFilter,ChatFilter } from './components/services/filter.service';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    HeaderComponent,
    AlertComponent,
    ErrorsComponent,
    ChatTimeFilter,
    ChatFilter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ChatService,AlertService,UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
