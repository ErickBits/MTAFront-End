import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from 'src/app/models/publication';
import { GLOBAL } from 'src/app/services/global';
import { PublicationService } from 'src/app/services/publication.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar-informacion-admin',
  templateUrl: './sidebar-informacion-admin.component.html',
  styleUrls: ['./sidebar-informacion-admin.component.css']
})
export class SidebarInformacionAdminComponent implements OnInit {

  public title: string;
	public identity;
	public token;
	public my_stats;
	public url;
	public status;
	public publication: Publication;

	// Output --> ponemos la etiqueta "@Output" y la propiedad que es el evento
	@Output() publicationSended = new EventEmitter();

	constructor(
		private _route             : ActivatedRoute,
		private _router            : Router,
		private _userService       : UserService,
		private _publicationService: PublicationService,
		private _uploadService     : UploadService
		) { 
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.my_stats = this._userService.getStats();
		this.url = GLOBAL.url;
		this.publication = new Publication('','','','','', '', '', '', this.identity._id);
	}

	ngOnInit() { 
		//this.my_stats = this._userService.getStats();
	}

	ngDoCheck(){
		this.my_stats = this._userService.getStats();
	}

	onSubmit(form, event){
		this._publicationService.newPublication(this.token, this.publication).subscribe(
			response => {
				if(response.publicationStored){
					this.publication = response.publicationStored;
					this.status = 'success';
					this.my_stats.publications += 1;
					this._userService.updateMyStats('publications',1);

					if(this.filesToUpload && this.filesToUpload.length){
						this._uploadService.makeFileRequest(this.url+'upload-image-pub/'+this.publication._id, [], this.filesToUpload, this.token, 'image').then((result: any) => {
							this.publication.file = result.publication.file;
							form.reset();
						});
					}

					form.reset();
					this.publicationSended.emit({send:'true'});
					this._router.navigate(['/admin/publicaciones']);					
				}else{
					this.status = 'error';
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
