import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  public title : string;
	public identity;

	constructor(
		private _userService: UserService,
		) {
		this.title = 'Bienvenido a Mta | Admin';
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		
	}

}
