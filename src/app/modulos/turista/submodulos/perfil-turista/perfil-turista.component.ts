import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Follow } from 'src/app/models/follow';
import { User } from 'src/app/models/user';
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil-turista',
  templateUrl: './perfil-turista.component.html',
  styleUrls: ['./perfil-turista.component.css']
})
export class PerfilTuristaComponent implements OnInit {

	public title  : string;
	public status : string;
	public user   : User;
	public url    : string;
	public section: string;		// indica la sección a mostrar
	public identity;
	public token;
	public stats;
	public followed;
	public following;

	constructor(
		private _route        : ActivatedRoute,
		private _router       : Router,
		private _userService  : UserService,
		private _followService: FollowService
		) { 
		this.title = 'Perfil';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.following = false;
		this.followed = false;
		this.section = 'publications'; // carga sección por defecto: publications, followings o followeds
	}

	ngOnInit() {
		this.loadPage();
	}

	ngDoCheck(){
		this.stats = this._userService.getStats();
	}

	loadPage(){
		this._route.params.subscribe(params => {
			let id = params['id'];
			//console.log('Profile id: '+id);
			if(params['section']){
				this.section = params['section'];
			}

			this.getUser(id);
			this.getCounters(id);
		});
	}

	getUser(id){
		this._userService.getUser(id).subscribe(
			response => {
				if(response.user){
					this.user = response.user;
					this.status = 'success';

					if(response.following){
						this.following = true;
					}else{
						this.following = false;
					}

					if(response.followed){
						this.followed = true;
					}else{
						this.followed = false;
					}

				}else{
					this.status = 'error';
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);

				this._router.navigate(['/turista/perfil', this.identity._id]);
			}
			);
	}

	getCounters(id){
		this._userService.getCounters(id).subscribe(
			response => {
				if(response){
					this.stats = response;
					if(this.identity._id == id) localStorage.setItem('stats', JSON.stringify(this.stats));
					/*if(this.identity._id == id){
						localStorage.setItem('stats', JSON.stringify(this.stats));
					}*/
					this.status = 'success';
				}else{
					this.status = 'error';
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);
			}
			);
	}

	/** Método para seguir a un usario "followed" **/
	followUser(followed){
		var follow = new Follow('', this.identity._id, followed);

		this._followService.addFollow(this.token, follow).subscribe(
			response => {
				this.following = true; 
				this.updateMyStats(1);
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

	/** Método para dejar de serguir a un usuario "followed" **/
	deleteFollowUser(followed){
		this._followService.deleteFollow(this.token, followed).subscribe(
			response => {
				this.following = false; 
				this.updateMyStats(-1);
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

	/** Método para cargar la sección que quiera (Siguiendo, Seguidores o Publicaciones) **/
	loadSecction(section){
		this.section = section;
		this.scrollTo();
	}

	scrollTo() {
		var el = document.querySelector("#secction-user");
		el.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	updateMyStats(value){
		let my_stats = this._userService.getStats();
		my_stats.following = my_stats.following+value;
		localStorage.setItem('stats', JSON.stringify(my_stats));
	}


}
