import { Component, OnInit } from '@angular/core';
import { UserService, AlertService } from '../_services/index';
import { User } from '../_models/index';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   model: any = {};
  ctrlFlag = '';
  public rows:Array<any> = [];
  users: User[] = [];
  public columns:Array<any> = [
    {title: 'Username', name: 'UserName'},
	{title: 'First Name', name: 'FirstName'},
	{title: 'Last Name', name: 'LastName'},
	{title: 'Email', name: 'Email'},
	{title: 'Role', name: 'Role'},
  ];
  

  constructor(private userService: UserService,
	private alertService: AlertService
  ) { }

  ngOnInit() {
	this.onChangeTable();
  }
  
  public onChangeTable() {
	this.userService.getAll().subscribe(users => { this.rows = users; });
  }
  
  public edit(id) {
	this.ctrlFlag = 'edit';
	this.userService.getById(id).subscribe(user => { this.model = user });
  }
  public delete(id){
	this.ctrlFlag = 'delete';
	this.userService.getById(id).subscribe(user => { this.model = user });
  }
  public updateOrDelete() {
    if(this.ctrlFlag === 'edit'){
		this.userService.update(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Update successful', true);
                    this.model = {};
                },
                error => {
                    this.alertService.error(error);
                });
				
	} else if(this.ctrlFlag === 'delete'){
		this.userService.delete(this.model.id)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Delete successful', true);
                    this.model = {};
                },
                error => {
                    this.alertService.error(error);
                });
	}
  }
  
  public cancel(){
	 this.model = {};
  }
  

}
