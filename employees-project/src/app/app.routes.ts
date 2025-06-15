import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from './components/delete-employee/delete-employee.component';
import { NotfoundcomponentComponent } from './components/notfoundcomponent/notfoundcomponent.component';

export const routes: Routes = [
      {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'add',
        component: AddEmployeeComponent,
      },
      {
        path: 'edit/:id',
        component: EditEmployeeComponent,
      },
      {
    path: 'delete/:id', // for single delete (optional)
    component: DeleteEmployeeComponent,
  },
  {
    path: 'delete', // for multi delete using query param: ?ids=1,2,3
    component: DeleteEmployeeComponent,
  }
      // {
      //   path: 'delete/:id',
      //   component: CheckoutComponent,
      //           // canActivate: [AuthGuard], // 🔐 حمايتها بالـ Guard
      // }
    ],
  },
  // ,{
  //   path: 'login',
  //   component: LoginComponent, 
  // },{
  //   path: 'signup',
  //   component: SignupComponent,
  // }
     {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {path:'**',component:NotfoundcomponentComponent}
];
