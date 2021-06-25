import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class TuristaGuard implements CanActivate{
	public url:string;
	public identity
	public token;
	public stats;

	constructor(
		private _router: Router,
		private _userService: UserService
		){}

	canActivate(){
		let identity = this._userService.getIdentity();

		if(identity && (identity.role == 'Turista')){
			return true;
		}else{
            window.alert("Acceso denegado, no eres turista, ingresa con tu cuenta de turista");
			this._router.navigate(['/inicioTurista']);
			return false;
		}
	}
}