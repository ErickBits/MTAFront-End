import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class GuiaGuard implements CanActivate{
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

		if(identity && (identity.role == 'Guia')){
			return true;
		}else{
            window.alert("Acceso denegado, no eres guia, ingresa con tu cuenta de guia")
			this._router.navigate(['/inicioGuia']);
			return false;
		}
	}
}