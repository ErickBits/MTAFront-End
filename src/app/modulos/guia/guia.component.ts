import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as $ from 'jquery';
import { Message } from 'src/app/models/message';
import { Publication } from 'src/app/models/publication';
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from 'src/app/services/global';
import { MessageService } from 'src/app/services/message.service';
import { PublicationService } from 'src/app/services/publication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.css'],
  providers  : [UserService, PublicationService]
})
export class GuiaComponent implements OnInit {

	public totalMensajes;
	public totalMensajesRecibidos;
	public totalPublicaciones;
	public my_stats;
	public publication: Publication;
	public title: string;
	public url  : string;
	public identity;
	public token;
	
	/* variables para enviar mensajes */
	public titleEnviar  : string;
	public messageEnviar: Message;
	public identityEnviar;
	public tokenEnviar;
	public statusEnviar;
	public followsEnviar;	
	/* ----------------------------- */
	
	constructor(
		private _userService: UserService,
		private _route      : ActivatedRoute,
		private _router     : Router,
		private _messageService: MessageService,
		private _publicationService: PublicationService,
		/* importaciones del enviar mensaje */
    	private _userServiceEnviar: UserService,
		private _messageServiceEnviar: MessageService,
		private _followServiceEnviar : FollowService,
		/* ------------------------- */
		) {
			
			this.identity = this._userService.getIdentity();
			this.my_stats = this._userService.getStats();
			this.token    = this._userService.getToken();
			this.url = GLOBAL.url;
			this.title = "MTA";
			/* -----------enviar---------- */
			this.titleEnviar = "Enviar mensaje";
			this.identityEnviar = this._userServiceEnviar.getIdentity();
			this.tokenEnviar    = this._userServiceEnviar.getToken();
			this.messageEnviar = new Message('','',false,'',this.identityEnviar._id,'');
			/* fin de enviar */
			
		}
		
		ngOnInit() {
			this.animacion();
			this.identity = this._userService.getIdentity();
			this.getMyFollowsEnviar();
			this.getMessages();
			this.getMyMessages();
			this.obtenerPublicacionesTotales();
		}
		
		/** El método ngDoCheck() está predefinido y sirve para que cada vez que haya un cambio se actualice **/
		ngDoCheck(){
			this.identity = this._userService.getIdentity();
			this.my_stats = this._userService.getStats();
		}
		
		// Output --> ponemos la etiqueta "@Output" y la propiedad que es el evento
		@Output() publicationSended = new EventEmitter();
		
		
		public filesToUpload: Array<File>;
		fileChangeEvent(fileInput: any){
			this.filesToUpload = <Array<File>>fileInput.target.files;
		}

		/* codigo para enviar mensaje */
		getMessages(page = 1){
		this._messageService.getMessages(this.token, page).subscribe(
			response => {
					this.totalMensajes = response.total;
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);
			}
		);
	}
	
	getMyMessages(page = 1){
		this._messageService.getMyMessages(this.token, page).subscribe(
			response => {
				if(response.messages){
					this.totalMensajesRecibidos = response.total;
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);

				
			}
		);
	}

  onSubmitEnviar(form) {
		this._messageServiceEnviar.addMessage(this.tokenEnviar, this.messageEnviar).subscribe(
			response => {
				if(response.message){
					this.statusEnviar = 'success';
					form.reset();
					window.location.reload();
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);

				if(errorMessage != null){
					this.statusEnviar = 'error';
				}
			}
		);
	}

	getMyFollowsEnviar(){
		this._followServiceEnviar.getMyFollows(this.tokenEnviar).subscribe(
			response => {
				if(response.follows){
					this.followsEnviar = response.follows;
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);
			}
			);
	}

  /* ------------------------- */


	logout(){
		localStorage.clear();
		this.identity = null;
    this._router.navigate(['/inicioGuia']);
	}


  animacion(){
    $(".sidebar-dropdown > a").click(function() {
      $(".sidebar-submenu").slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass("active")
      ) {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .parent()
          .removeClass("active");
      } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .next(".sidebar-submenu")
          .slideDown(200);
        $(this)
          .parent()
          .addClass("active");
      }
    });
    
    $("#close-sidebar").click(function() {
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function() {
      $(".page-wrapper").addClass("toggled");
    });
  }

  /* obtener publicaciones */
  obtenerPublicacionesTotales(page =1){
	  this._publicationService.getPublications(this.token, page).subscribe(
		response => {
			this.totalPublicaciones = response.total_items;
		},
		error => {
			var errorMessage = <any>error;
			console.log(errorMessage);
		}
		);
  }





}
