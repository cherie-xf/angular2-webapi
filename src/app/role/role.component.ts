import { Component, OnInit } from '@angular/core';
import { RoleService, AlertService } from '../_services/index';
import { Role } from '../_models/index';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  model: any = {};
  ctrlFlag = '';
  public rows:Array<any> = [];
  public columns:Array<any> = [
	  {title: 'Role', name: 'Role'},
  ];

  constructor(
	  private alertService: AlertService,
	  private roleService: RoleService,
  ) { }

  ngOnInit() {
    this.onChangeTable();
  }

  public onChangeTable() {
	  this.roleService.getAll().subscribe(roles => { this.rows = roles; });
  }

  public delete(id){
    this.ctrlFlag = 'delete';
    this.roleService.getById(id).subscribe(role => { this.model = role });
  }
  public create() {
    this.ctrlFlag = 'create';
  }

  public updateOrDelete() {
	  if(this.ctrlFlag === 'delete'){
		  this.roleService.delete(this.model.roleId)
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
        this.roleService.create(this.model)
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
