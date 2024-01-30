import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServicesService } from '../../../user-services.service';
import { StudentIdService } from '../../../student-id.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  course_id:any;
  student_id:any;
  instructors:any[]=[];
  tas:any[]=[];
  lectureNotes:any[]=[];
  tutorialNotes:any[]=[];
  course: {
    course_id: number;
    name: string;
    subclass: string;
    description: string;
    professor_message: string;
    zoom_link: string;
  } = {
    course_id: 0,
    name: '',
    subclass: '',
    description: '',
    professor_message: '',
    zoom_link: '',
  };
  constructor(private route: ActivatedRoute,
    private userServices:UserServicesService,
    private elementRef: ElementRef,
    private studentId:StudentIdService) {
    this.route.paramMap.subscribe(params => {

      this.course_id = params.get('course_id');

      console.log(this.course_id); // Output: comp3232
      // You can assign the value to a component property or use it as needed
    });
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
    this.userServices.getCourse({'course_id': this.course_id})
    .subscribe((res:any)=>{
      console.log(res);
      this.course = res.course;
      this.instructors = res.instructors;
      this.tas = res.tas;
      this.lectureNotes = res.lecture_notes;
      this.tutorialNotes = res.tutorial_notes;
    })
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
