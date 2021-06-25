import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class AdminGuard implements CanActivate{
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

		if(identity && (identity.role == 'Administrador')){
			return true;
		}else{
            window.alert("Acceso denegado, no eres administrador, ingresa con tu cuenta de administrador");
			this._router.navigate(['/inicioAdmin']);
            return false;
		}
	}
}