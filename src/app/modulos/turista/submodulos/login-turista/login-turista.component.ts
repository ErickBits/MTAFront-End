import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-turista',
  templateUrl: './login-turista.component.html',
  styleUrls: ['./login-turista.component.css']
})
export class LoginTuristaComponent implements OnInit {

  public title :string;	//--> título de la sección
	public user  :User;		//--> campos usuario que recibo
	public status:string;	//--> estado del login
	public identity;		//--> usuario completo tras el login
	public token;			//--> token tras el login

  /* variable del registro */

	public statusR:string;	//--> estado del login
	public messageR;

	constructor(
		private _route      : ActivatedRoute,
		private _router     : Router,
		private _userService: UserService
		) { 
		this.title = 'Login | Guia';
		this.user = new User('','','','','','','Guia','','','');
	}


	ngOnInit() {
    this.animacion();
  }

  animacion(){
    document.querySelector('.img__btn').addEventListener('click', function() {
      document.querySelector('.cont').classList.toggle('s--signup');
    });
  }

  onSubmitR(formR){
		this._userService.registerTurista(this.user).subscribe(
			response => {
				if(response.user && response.user._id){
					this.statusR = 'success';
					formR.reset();
				}else{
					this.statusR = 'error';
					this.messageR = response.messageR;
				}
			},
			error => {
				console.log(<any>error);
			}
			);
	}

	onSubmit(form){
		this._userService.login(this.user).subscribe(
			response => {
				this.identity = response.user;

				if(this.identity && this.identity._id){

					// Persistir datos del usuario en el LocalStorage
					localStorage.setItem('identity',JSON.stringify(this.identity));

					// Conseguir token
					this.getToken();
          this._router.navigate(['/turista/home']);

				}else{
					this.status = 'error';
				}
			},
			error => {
				this.status = 'error';
				console.log(<any>error);
			}
			);
	}

	/** Método para conseguir el TOKEN al loguearse **/
	getToken(){
		this._userService.login(this.user, 'true').subscribe(
			response => {
				this.token = JSON.stringify(response.token);

				if(this.token.length > 0){

					// Persistir el token en el LocalStorage
					localStorage.setItem('token',this.token);

					// Conseguir contadores o estadísticas
					this.getCounters();

				}else{
					this.status = 'error';
				}
			},
			error => {
				this.status = 'error';
				console.log(<any>error);
			}
			);
	}


	getCounters(){
		this._userService.getCounters().subscribe(
			response => {
				localStorage.setItem('stats', JSON.stringify(response));
				this.status = 'success';
				this._router.navigate(['/turista/home']);

			},
			error => {
				console.log(<any>error);
			}
			);
	}



}
