import { Component, HostListener } from '@angular/core';
import { UserServicesService } from './user-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'course-system';
  ngOnInit() {
    window.addEventListener('beforeunload', this.beforeunloadHandler);
  }
  constructor(private userServices:UserServicesService){
  }
  
  beforeunloadHandler(event:Event) {
    var student_id = sessionStorage.getItem('student_id');
    if(student_id){
      this.userServices.logout({'student_id': student_id})
    }
  }
}
