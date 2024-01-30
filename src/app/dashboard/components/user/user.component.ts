import { Component, OnInit } from '@angular/core';
import { StudentIdService } from '../../../student-id.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from '../../../user-services.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  showPassword = false;
  showConfirmPassword = false;
  student_id:any;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
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
    this.userServices.getStudent({'student_id': this.student_id})
    .subscribe((student:any)=>{
      console.log(student);
      this.form.setValue({
        name: student.name,
        email: student.email,
        username: student.username,
        password: student.password,
        confirmPassword: student.password,
      })
    })
  }
  update(event:Event){
    event.preventDefault();
    console.log(this.form.value);
    if(this.form.value.password != this.form.value.confirmPassword){
      alert("Passwords do not match");
      return;
    }
    this.userServices.updateStudent({
      'name': this.form.value.name,
      'email': this.form.value.email,
      'student_id': this.student_id,
      'username': this.form.value.username,
      'password': this.form.value.password,
    })
    .subscribe((res:any)=>{
      console.log(res);
      alert("Update successful");
    })
  }
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  ngOnInit(): void {
  }

}
