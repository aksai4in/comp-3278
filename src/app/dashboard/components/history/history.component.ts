import { Component } from '@angular/core';
import { StudentIdService } from '../../../student-id.service';
import { UserServicesService } from '../../../user-services.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  loginList:any;
  student_id:any;
  constructor(
    private studentId:StudentIdService,
    private userServices:UserServicesService
    ) { 
    // check for student id
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
    // get login history
    this.userServices.getLoginHistory({'student_id': this.student_id})
    .subscribe((res:any)=>{
      console.log(res[0][0]);

      this.loginList = res;
    })
  }
}
