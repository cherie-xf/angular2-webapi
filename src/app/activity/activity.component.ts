import { Component, OnInit } from '@angular/core';
import { ActivityService, AlertService } from '../_services/index';
import { Activity } from '../_models/index';
import { MyDatePickerModule } from 'mydatepicker';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  model: any = {};
  ctrlFlag = '';
  public rows:Array<any> = [];
  public columns:Array<any> = [
	  {title: 'Activity', name: 'Activity'},
	  {title: 'Create Date', name: 'CteateDate'},
  ];

  constructor(
	  private alertService: AlertService,
	  private activityService: ActivityService,
  ) { }

  ngOnInit() {
    this.onChangeTable();
  }

  public onChangeTable() {
	  this.activityService.getAll().subscribe(activities => { this.rows = activities; });
  }

  public delete(id){
    this.ctrlFlag = 'delete';
    this.activityService.getById(id).subscribe(activity => { this.model = activity });
  }
  public create() {
    this.ctrlFlag = 'create';
  }

  public updateOrDelete() {
	  if(this.ctrlFlag === 'delete'){
		  this.activityService.delete(this.model.activityId)
            .subscribe(
                data => {
                    this.alertService.success('Delete successful', true);
                    this.model = {};
	                  this.onChangeTable();
                    this.ctrlFlag = '';
                },
                error => {
                    this.alertService.error(error);
                });
    } else if(this.ctrlFlag === 'create') {
        this.activityService.create(this.model)
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
