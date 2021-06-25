import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { GLOBAL } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editar-perfil-guia',
  templateUrl: './editar-perfil-guia.component.html',
  styleUrls: ['./editar-perfil-guia.component.css'],
  providers  : [UserService, UploadService]
})
export class EditarPerfilGuiaComponent implements OnInit {

	public title : string;
	public status: string;
	public user  : User;
	public url   : string;
	public identity;
	public token;

	constructor(
		private _route        : ActivatedRoute,
		private _router       : Router,
		private _userService  : UserService,
		private _uploadService: UploadService
		) { 
		this.title = 'Actualizar mis datos';
		this.user = this._userService.getIdentity();
		this.identity = this.user;
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit() {}

	onSubmit() {
		this._userService.updateUser(this.user).subscribe(
			response => {
				if(!response.user){
					this.status = 'error';
					//console.log(response);
				}else{
					this.status = 'success';
					localStorage.setItem('identity', JSON.stringify(this.user));
					this.identity = this.user;

					if(this.filesToUpload != null){
						this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image').then((result: any) => {
							//console.log(result);
							this.user.image = result.user.image;
							localStorage.setItem('identity', JSON.stringify(this.user));
						});
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


	public filesToUpload: Array<File>;
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}


}
