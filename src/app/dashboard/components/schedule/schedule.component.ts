import { Component, OnInit } from '@angular/core';
import { StudentIdService } from '../../../student-id.service';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, startOfWeek } from 'date-fns';
import { UserServicesService } from '../../../user-services.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class ScheduleComponent implements OnInit {
  student_id:any;
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  dayStart: number = 8;
  events: CalendarEvent[] = [
    {
      title: 'Resizable event',
      color:  { primary: '#ad2121', secondary: '#FAE3E3' },
      start: new Date(2023, 10, 22, 10, 0),
      end: new Date(2023, 10, 22, 10, 20), // an end date is always required for resizable events to work
      resizable: {
        beforeStart: false, // this allows you to configure the sides the event is resizable from
        afterEnd: false
      }
    },]
    
  constructor(private studentId:StudentIdService,
    private userServices:UserServicesService) { 
    var sessionStudentId = sessionStorage.getItem('student_id');
    if(sessionStudentId){
      this.student_id = sessionStudentId;
    }else{
      if(this.studentId.getStudentId()){
        this.student_id = this.studentId.getStudentId();
        sessionStorage.setItem('student_id', this.student_id);
      }else{
        window.location.href = "";
      }
    }
    this.userServices.getSchedule({'student_id': this.student_id})
    .subscribe((schedule:any)=>{
      console.log(schedule);
      var tempEvents: CalendarEvent[] = [];
      for(let lesson of schedule){
        var startTime = new Date();
        var endTime = new Date();
        // get day of week
        var daysToAdd = lesson.day_of_the_week - startTime.getDay();
        // add days to start and end time
        startTime.setDate(startTime.getDate() + daysToAdd);
        endTime.setDate(endTime.getDate() + daysToAdd);

        var [hours, minutes, seconds] = lesson.start_time.split(":").map(Number);
        startTime.setHours(hours);
        startTime.setMinutes(minutes);
        startTime.setSeconds(seconds);
        var [hours, minutes, seconds] = lesson.end_time.split(":").map(Number);
        endTime.setHours(hours);
        endTime.setMinutes(minutes);
        endTime.setSeconds(seconds);

        tempEvents.push(
          {
            title: lesson.course_id + " " + lesson.subclass +" " + lesson.name + ' ' + lesson.address,
            color:  { primary: '#ad2121', secondary: '#FAE3E3' },
            start: startTime,
            end: endTime, 
            resizable: {
              beforeStart: false, 
              afterEnd: false
            }
          }
        );
        
      }
      this.events = tempEvents;
      console.log(this.events);
    })
  }
  getWeekStart(): Date {
    return startOfWeek(this.viewDate);
  }


  getWeekEnd(): Date {
    return addDays(this.getWeekStart(), 6);
  }

  ngOnInit(): void {
  }

}
