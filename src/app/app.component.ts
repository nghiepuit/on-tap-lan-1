
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';

	public users: any[] = [
		{
			id: 1,
			name: 'nguyen van a',
			email: 'nghiepuit@gmail.com',
			status: true
		},
		{
			id: 2,
			name: 'vu quoc tuan',
			email: 'quoctuan@gmail.com',
			status: true
		}
	];

	public user: any = {
		status: 0
	};

	public isEditing: boolean = false;
	public isHidden: boolean = true;

	public isNameValid: boolean = false;
	public isEmailValid: boolean = false;
	public isSubmitted: boolean = false;

	public key: string = '';
	public value: number = 1;

	sort(key: string) {
		this.value = - this.value;
		this.users.sort((a, b) => {
			if (a[key] > b[key]) return this.value > 0 ? 1 : -1;
			else if (a[key] < b[key]) return this.value > 0 ? -1 : 1;
			else return 0;
		});
	}


	initData() {
		this.user = {
			status: 0
		};
	}

	onSubmit() {
		this.isSubmitted = true;
		this.isNameValid = false;
		this.isEmailValid = false;

		if (this.user.name.length >= 6) {
			this.isNameValid = true;
		}

		if (this.validateEmail(this.user.email)) {
			this.isEmailValid = true;
		}

		if (this.isNameValid == true && this.isEmailValid == true) {
			if (this.isEditing) {
				this.update();
			} else {
				this.user.id = this.getLastID(this.users);
				this.users.push(this.user);
				this.initData();
				this.isHidden = true;
			}
		}
	}

	getLastID(users: any[]): number {
		return users.length > 0 ? users.sort((a, b) => {
			if (a.id > b.id) return 1;
			else if (a.id < b.id) return -1;
			else return 0;
		})[users.length - 1].id + 1 : 1;
	}

	delete(id: number) {
		this.users.forEach((value, index) => {
			if (value.id == id) {
				this.users.splice(index, 1);
			}
		})
	}

	add() {
		this.isEditing = false;
		this.isHidden = false;
		this.initData();
	}

	edit(id: number) {
		this.users.forEach((value, index) => {
			if (value.id == id) {
				value.status = value.status ? 1 : 0;
				this.user = {
					id: value.id,
					name: value.name,
					email: value.email,
					status: value.status
				};
			}
		});
		this.isEditing = true;
		this.isHidden = false;
	}

	update() {
		this.users.forEach((value, index) => {
			if (value.id == this.user.id) {
				this.users[index] = {
					id: this.user.id,
					name: this.user.name,
					email: this.user.email,
					status: this.user.status == 1 ? true : false
				}
			}
		});
		this.isEditing = false;
		this.isHidden = true;
	}

	updateStatus(id: number) {
		this.users.forEach((value, index) => {
			if (value.id == id) {
				this.users[index].status = !this.users[index].status;
			}
		});
	}

	isDisabled() {
		return (!this.user.name || !this.user.email);
	}

	validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

}
