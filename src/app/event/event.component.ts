import { Component, OnInit } from '@angular/core';
import { EventService, ActivityService, AlertService } from '../_services/index';
import { Event, Activity } from '../_models/index';
import { MyDatePickerModule } from 'mydatepicker';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  model: any = {};
  ctrlFlag = '';
  public rows:Array<any> = [];
  activities: Activity[] = [];
  public columns:Array<any> = [
	  {title: 'From Date', name: 'fromDate'},
	  {title: 'To Date', name: 'toDate'},
	  {title: 'Activity', name: 'activityDesc'},
	  {title: 'User Name', name: 'userName'},
	  {title: 'Create Date', name: 'createDate'},
  ];

  constructor(
	  private alertService: AlertService,
	  private activityService: ActivityService,
	  private eventService: EventService,
  ) { }

  ngOnInit() {
    this.onChangeTable();
  }

  public onChangeTable() {
	  this.activityService.getAll().subscribe(activities => { this.activities = activities; });
      this.eventService.getAll().subscribe(events => { this.rows = events;
        for (var i = 0; i < this.rows.length; i++) {
          var row = this.rows[i];
          var fromF = row.fromDate.split('T')[0];
          var fromB = row.fromDate.split('T')[1];
          row.fromY = parseInt(fromF.split('-')[0]);
          row.fromM = parseInt(fromF.split('-')[1])-1;
          row.fromD = parseInt(fromF.split('-')[2]);
          row.fromh = parseInt(fromB.split(':')[0]);
          row.fromm = parseInt(fromB.split(':')[1]);
          row.froms = parseInt(fromB.split(':')[2]);
          var toF = row.toDate.split('T')[0];
          var toB = row.toDate.split('T')[1];
          row.toY = parseInt(toF.split('-')[0]);
          row.toM = parseInt(toF.split('-')[1])-1;
          row.toD = parseInt(toF.split('-')[2]);
          row.toh = parseInt(toB.split(':')[0]);
          row.tom = parseInt(toB.split(':')[1]);
          row.tos = parseInt(toB.split(':')[2]);
        }
      });
  }

  public delete(id){
    this.ctrlFlag = 'delete';
    this.eventService.getById(id).subscribe(event => { this.model = event });
  }
  public create() {
    this.ctrlFlag = 'create';
  }

  public updateOrDelete() {
	  if(this.ctrlFlag === 'delete'){
		  this.eventService.delete(this.model.eventId)
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
        this.eventService.create(this.model)
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
    } else if(this.ctrlFlag === 'edit') {
		  this.eventService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Update successful', true);
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
