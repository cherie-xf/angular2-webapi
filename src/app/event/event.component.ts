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
  events: Array<any> = [];
  currentWeek: Array<Date> = [];
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
    this.currentWeek = this.getCurrentWeek(new Date());
    this.onChangeTable();
  }

  public onChangeTable() {
      this.events = [];
	  this.activityService.getAll().subscribe(activities => { this.activities = activities; });
      this.eventService.getAll().subscribe(events => { this.rows = events;
        for (var i = 0; i < this.rows.length; i++) {
          let row = this.rows[i];
          let fromF = row.fromDate.split('T')[0];
          let fromB = row.fromDate.split('T')[1];
          row.fromY = parseInt(fromF.split('-')[0]);
          row.fromM = parseInt(fromF.split('-')[1])-1;
          row.fromD = parseInt(fromF.split('-')[2]);
          row.fromh = parseInt(fromB.split(':')[0]);
          row.fromm = parseInt(fromB.split(':')[1]);
          row.froms = parseInt(fromB.split(':')[2]);
          let toF = row.toDate.split('T')[0];
          let toB = row.toDate.split('T')[1];
          row.toY = parseInt(toF.split('-')[0]);
          row.toM = parseInt(toF.split('-')[1])-1;
          row.toD = parseInt(toF.split('-')[2]);
          row.toh = parseInt(toB.split(':')[0]);
          row.tom = parseInt(toB.split(':')[1]);
          row.tos = parseInt(toB.split(':')[2]);
          row.fromRealDate = new Date(row.fromY, row.fromM, row.fromD, row.fromh, row.fromm, row.froms);
          row.toRealDate = new Date(row.toY, row.toM, row.toD, row.toh, row.tom, row.tos);

          // push current data to events
            if(this.currentWeek[0] && this.currentWeek[1]){
                if((row.fromRealDate.getTime()>= this.currentWeek[0].getTime() &&
                   row.fromRealDate.getTime()<= this.currentWeek[1].getTime()) ||
                   (row.toRealDate.getTime()>= this.currentWeek[0].getTime() &&
                   row.toRealDate.getTime()<= this.currentWeek[1].getTime()) ){
                    this.events.push(row);
                 }
            }
        }

      });
  }

  public edit(id) {
    this.ctrlFlag = 'edit';
    this.eventService.getById(id).subscribe(event => { this.model = event });
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

  /*
  private getCurrentWeek(date: Date) {
      let now = date? new Date(date) : new Date(); 
      // set time to some convenient value 
      now.setHours(0,0,0,0); 
      // Get the previous Monday 
      let monday = new Date(now); 
      monday.setDate(monday.getDate() - monday.getDay() + 1); 
      // Get next Sunday 
      let sunday = new Date(now); 
      sunday.setDate(sunday.getDate() - sunday.getDay() + 7); 
      // Return array of date objects 
      return [monday, sunday];
  }
  */
  private getCurrentWeek(date: Date) {

  let curr = date ||new Date; // get current date
  curr.setHours(0,0,0,0); 
  let first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
  let last = first + 7; // last day is the first day + 6
  var firstday = new Date(curr.setDate(first));
  var lastday = new Date(curr.setDate(last));
  return [firstday, lastday];

  }
  public preweek() {
    let newDate = new Date(this.currentWeek[0].getTime() - 86400000 * 7);
    this.currentWeek = this.getCurrentWeek(newDate);
    this.onChangeTable();
  }
  public curweek() {
    this.currentWeek = this.getCurrentWeek(new Date());
    this.onChangeTable();
  }
  public nextweek() {
    let newDate = new Date(this.currentWeek[0].getTime() + 86400000 * 7);
    this.currentWeek = this.getCurrentWeek(newDate);
    this.onChangeTable();
  }

}
