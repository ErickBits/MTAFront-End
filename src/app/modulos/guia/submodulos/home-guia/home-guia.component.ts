import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-guia',
  templateUrl: './home-guia.component.html',
  styleUrls: ['./home-guia.component.css']
})
export class HomeGuiaComponent implements OnInit {

	public title : string;
	public identity;

	constructor(
		private _userService: UserService,
		) {
		this.title = 'Bienvenido a Mta | Guia';
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		
	}

}
