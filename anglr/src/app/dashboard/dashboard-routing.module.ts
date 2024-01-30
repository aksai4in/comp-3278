import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { UserComponent } from './components/user/user.component';
import { SidenavWrapperComponent } from './components/sidenav-wrapper/sidenav-wrapper.component';
import { HistoryComponent } from './components/history/history.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { CourseComponent } from './components/course/course.component';

const routes: Routes = [
  // Sidenavwrapper Component acts like a shell & the active child Component gets rendered into the <router-outlet>
  {
    path: '',
    component: SidenavWrapperComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'schedule',
        component: ScheduleComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'my_courses',
        component: MyCoursesComponent
      },
      { 
        path: 'course/:course_id', 
        component: CourseComponent 
    }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
