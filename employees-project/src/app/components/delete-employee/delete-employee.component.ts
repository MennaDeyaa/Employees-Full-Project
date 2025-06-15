import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../shared/services/employee.service';
import { Employee } from 'src/app/shared/interfaces/employee';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation.service';


@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [CommonModule , FormsModule, ReactiveFormsModule , TranslateModule],
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit{
  ids: number[] = [];
  isDeleting: boolean = false;

  employees: Employee[] = [];
    paginatedEmployees: Employee[] = [];
    totalCount: number = 0; 
    searchTerm: string = '';
    sortColumn: string = 'name';
    sortDirection: string = 'ASC';
    pageNumber: number = 1;
    pageSize: number = 10;
  
    selectedEmployees: number[] = [];
      selectedIds: number[] = []; // ✅ Add this line
  constructor (  
    private employeeService: EmployeeService,
      private router: Router,
        private route: ActivatedRoute ,
        private translate: TranslateService
       ,private _TranslationService:TranslationService) {
         //  this.translate.setDefaultLang('en');
         // this.translate.use('en');
        }
          changeLang(event: Event) {
         const selectedLang = (event.target as HTMLSelectElement).value;
         this._TranslationService.setLanguage(selectedLang); // أو this.translate.use(selectedLang)
       }

        ngOnInit(): void {
    const idsParam = this.route.snapshot.queryParamMap.get('ids');
    if (idsParam) {
      this.ids = idsParam.split(',').map(id => +id);
    } else {
      const routeId = this.route.snapshot.paramMap.get('id');
      if (routeId) this.ids = [+routeId];
    }
  }

confirmDelete(): void {
  if (this.ids.length === 0 || this.isDeleting) return;

  this.isDeleting = true;  // تعطل الزر من هنا

  if (this.ids.length === 1) {
    this.employeeService.deleteEmployee(this.ids[0]).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Employee Deleted',
          text: 'The employee was deleted successfully!',
          timer: 2000,
          showConfirmButton: false
        });

        setTimeout(() => {
          this.isDeleting = false; 
          this.router.navigateByUrl('/home');
               this.loadEmployees();

        }, 2000);
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        this.isDeleting = false;  // يرجع الزر شغال عشان ممكن يجرب تاني
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while deleting the employee!'
        });
      }
    });
  } else {
    this.employeeService.deleteMultipleEmployees(this.ids).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Employees Deleted',
          text: `${this.ids.length} employees were deleted successfully!`,
          timer: 2000,
          showConfirmButton: false
        });

        setTimeout(() => {
          this.isDeleting = false;
          localStorage.setItem('selectedEmployees', JSON.stringify([]));

          this.router.navigateByUrl('/home');
               this.loadEmployees();

        }, 2000);
      },
      error: (error) => {
        console.error('Error deleting employees:', error);
        this.isDeleting = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while deleting the employees!'
        });
      }
    });
  }
}

 cancel(): void {
    this.router.navigate(['/home']);
  }
   loadEmployees(): void {
      this.employeeService
        .getEmployees(this.searchTerm, this.sortColumn, this.sortDirection, this.pageNumber, this.pageSize)
        .subscribe((data: Employee[]) => {
          setTimeout(() => {
            this.employees = data;
            this.paginatedEmployees = data;
          });
        });
  
        this.employeeService.getTotalEmployeeCount().subscribe({
      next: (res) => this.totalCount = res.totalCount,
      error: (err) => console.error('Error fetching total count', err)
    });
    }

}
