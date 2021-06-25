import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-turista',
  templateUrl: './home-turista.component.html',
  styleUrls: ['./home-turista.component.css']
})
export class HomeTuristaComponent implements OnInit {

	public title : string;
	public identity;

	constructor(
		private _userService: UserService,
		) {
		this.title = 'Bienvenido a Mta | Turista';
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		
	}

}
