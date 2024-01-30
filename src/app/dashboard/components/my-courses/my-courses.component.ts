import { Component, ElementRef } from '@angular/core';
import { StudentIdService } from '../../../student-id.service';
import { UserServicesService } from '../../../user-services.service';
interface Course{
  course_id: number,
  name: string,
  subclass: string,
}
@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})

export class MyCoursesComponent {
  courses: Course[]= []
  student_id:any;
  constructor(private studentId:StudentIdService,
    private userServices:UserServicesService,
    private elementRef: ElementRef) { 
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
    this.userServices.getStudentCourses({'student_id': this.student_id})
    .subscribe((res:any)=>{
      console.log(res);
      this.courses = res;
    })
  }
  goToCourse(course: Course){
    console.log(course);
    window.location.href = "/course/"+course.course_id;
  }
  getInnerHtml() {
    const html = this.elementRef.nativeElement.innerHTML;
    var email:String = '';
    this.userServices.getStudent({'student_id': this.student_id})
    .subscribe((res:any)=>{
      console.log(res);
      email = res.email;
      const emailData = {
        to: email,
        subject: 'Test Email',
        body: html
      };
      this.userServices.sendEmail(emailData)
      .subscribe((res:any)=>{
        console.log(res);
      })
      console.log(html);
    })
  }

}
