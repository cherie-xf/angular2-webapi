import { Component, OnInit } from '@angular/core';
import { UserService, AlertService, RoleService } from '../_services/index';
import { User, Role } from '../_models/index';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  model: any = {};
  currentUser: User;
  ctrlFlag = '';
  public rows:Array<any> = [];
  users: User[] = [];
  roles: Role[] = [];
  public columns:Array<any> = [
    {title: 'Username', name: 'UserName'},
    {title: 'First Name', name: 'FirstName'},
    {title: 'Last Name', name: 'LastName'},
    {title: 'Email', name: 'Email'},
    {title: 'Role', name: 'Role'},
  ];
  

  constructor(
    private userService: UserService,
    private roleService: RoleService,
	  private alertService: AlertService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.onChangeTable();
  }
  
  public onChangeTable() {
	  this.userService.getAll().subscribe(users => { this.rows = users; });
    this.roleService.getAll().subscribe(roles => { this.roles = roles; });
  }
  
  public edit(id) {
    this.ctrlFlag = 'edit';
    this.userService.getById(id).subscribe(user => { this.model = user });
  }
  public delete(id){
    this.ctrlFlag = 'delete';
    this.userService.getById(id).subscribe(user => { this.model = user });
  }
  public create() {
    this.ctrlFlag = 'create';
  }
  public updateOrDelete() {
    if(this.ctrlFlag === 'edit'){
		  this.userService.update(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Update successful', true);
                    this.model = {};
	                  this.onChangeTable();
                    this.ctrlFlag = '';
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
	                  this.onChangeTable();
                    this.ctrlFlag = '';
                },
                error => {
                    this.alertService.error(error);
                });
    } else if(this.ctrlFlag === 'create') {
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Create successful', true);
                    this.model = {};
	                  this.onChangeTable();
                    this.ctrlFlag = '';
                },
                error => {
                    this.alertService.error(error);
                });
    }
  }
  
  public cancel(){
	  this.model = {};
    this.ctrlFlag = '';
  }
  

}
