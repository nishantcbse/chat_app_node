import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class UserService implements CanActivate {
	private user = new BehaviorSubject<any>('');
    currentUser = this.user.asObservable();
    private SUrl = new BehaviorSubject<any>('');
  srcValue = this.SUrl.asObservable();
    BASE_URL:string;
    private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http, private router: Router, private _sanitizer: DomSanitizer) { 
	    this.BASE_URL = environment.BASE_URL;
	} 
	store_user(user): void{
		let $user = user.json()
		 let data = {
		 	token:$user.data.token,
            name: $user.data.name,
            username: $user.data.username,
        }
        localStorage.setItem('user', JSON.stringify(data));
        this.updateUser(data)
	}
	updateUser(user: any): void{
     this.user.next(user)
  }
 
	get_user(): void{
		let $data = localStorage.getItem('user');
		$data = JSON.parse($data );
		this.updateUser($data)
	}
  getUser($data): Promise<any>{
     let url: string = this.BASE_URL+'get_user';
    return this.http.post(url, $data, {headers: this.headers}).toPromise();
  }
  update_details($data): Promise<any>{
    let url: string = this.BASE_URL+'updateDetails';
    return this.http.post(url, $data, {headers: this.headers}).toPromise();
  }
  changaPassword($data): Promise<any>{
    let url: string = this.BASE_URL+'passwordChange';
    return this.http.post(url, $data, {headers: this.headers}).toPromise();
  }
	login($data): Promise<any>{
		let url: string = this.BASE_URL+'login';
  	return this.http.post(url, $data, {headers: this.headers}).toPromise();
	}
	register($data): Promise<any>{
		let url: string = this.BASE_URL+'signup';
  	return this.http.post(url, $data, {headers: this.headers}).toPromise();
	}
	canActivate(): boolean {
	   if (localStorage.getItem('user')) {
	      return true;
	    }
	    else {
	      this.router.navigate(['/login'])
	      return false;
	    }
	}
	logout():void{
		localStorage.removeItem('user');
    	this.router.navigate(['/login'])
	}
	getimage(image: any) {
	    this.SUrl.next(this._sanitizer.bypassSecurityTrustResourceUrl(image));
	  }
}