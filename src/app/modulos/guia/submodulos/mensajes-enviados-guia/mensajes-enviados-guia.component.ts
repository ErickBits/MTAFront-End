import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from 'src/app/services/global';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mensajes-enviados-guia',
  templateUrl: './mensajes-enviados-guia.component.html',
  styleUrls: ['./mensajes-enviados-guia.component.css']
})
export class MensajesEnviadosGuiaComponent implements OnInit {

	public title   : string;
	public message : Message;
	public url     : string;
	public messages: Message[];		// Array con los mensajes
	public totalMensajes;
	public identity;
	public token;
	public status;
	public page;			// Página actual
	public next_page;		// Página siguiente
	public prev_page;		// Página previa
	public pages;			// Total de páginas
	public paginas;			// Array con el número de páginas (para paginación)


	constructor(
		private _route         : ActivatedRoute,
		private _router        : Router,
		private _messageService: MessageService,
		private _followService : FollowService,
		private _userService   : UserService
		) {
		this.title    = "Mensajes enviados";
		this.identity = this._userService.getIdentity();
		this.token    = this._userService.getToken();
		this.url      = GLOBAL.url;
	}

	ngOnInit() {
		//console.log('Sended.component cargado...');
		this.actualPage();
		
	}

	actualPage(){
		this._route.params.subscribe(params => {
			let page = 1;

			if(params['page']) {
				page = +params['page']; //--> con el signo +, convertimos a entero
			}
			this.page = page;
			this.next_page = page+1;
			this.prev_page = page-1;
			if(this.prev_page <= 0){
				this.prev_page = 1;
			}

			// devolver listado de usuarios
			this.getMessages(page);
		});
	}

	getMessages(page = 1){
		this._messageService.getMessages(this.token, page).subscribe(
			response => {
				if(response.messages){
					//console.log(response);
					this.status = 'success';
					this.messages = response.messages;
					this.pages = response.pages;
					this.paginas = Array.from(Array(this.pages).keys());
					this.totalMensajes = response.total;
					console.log(this.totalMensajes);
					if(page > this.pages){ //--> si se pone una página incorrecta nos lleva a la primera
						this._router.navigate(['/guia/mensajesAdmin/', 1]);
					}
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);

				if(errorMessage != null){
					this.status = 'error';
				}
			}
		);
	}

	/** Método que captura el evento enviado por sidebar **/
	refreshMessages(event=null){
		this.getMessages();
	}

}
