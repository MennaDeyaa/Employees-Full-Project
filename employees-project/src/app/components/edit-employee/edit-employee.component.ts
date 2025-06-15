import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../shared/services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/shared/interfaces/employee';


import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule , 
        ReactiveFormsModule , TranslateModule 
        ],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit{
   employees: Employee[] = [];
      paginatedEmployees: Employee[] = [];
      totalCount: number = 0; 
      searchTerm: string = '';
    sortColumn: string = 'name';
    sortDirection: string = 'ASC';
    pageNumber: number = 1;
    pageSize: number = 10;

  employeeForm: FormGroup;
employeeId!: number;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
      private route: ActivatedRoute ,
      private translate: TranslateService
      ,private _TranslationService:TranslationService
        ) {
          this.employeeForm = this.createEmployeeForm();
        //   this.translate.setDefaultLang('en');
        // this.translate.use('en');
        }
        changeLang(event: Event) {
               const selectedLang = (event.target as HTMLSelectElement).value;
               this._TranslationService.setLanguage(selectedLang); // أو this.translate.use(selectedLang)
             }

ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.employeeId = +idParam; // استخدمي + لتحويله لـ number
        console.log('Employee ID:', this.employeeId);
        // Call backend to get employee data by ID
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (employeeData) => {
          this.employeeForm.patchValue(employeeData); // Fill the form with data
        },
        error: (err) => {
          console.error('Error fetching employee:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load employee data.'
          });
        }
      });
  }}
);
  }

  createEmployeeForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.mobileValidator]],
      address: ['', [Validators.required]]
    });
  }

  mobileValidator(control: any) {
    const phone = control.value;
    if (!phone) return null;
    
    const mobilePattern = /^(010|011|012)\d{8}$/;
    return mobilePattern.test(phone) ? null : { invalidMobile: true };
  }

 editEmployee(employeeData: any): void {
  if (this.employeeForm.valid) {
           const updatedData = {
      ...this.employeeForm.value,
      id: this.employeeId
    };

    this.employeeService.updateEmployee(this.employeeId, updatedData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Employee Edited',
          text: 'The employee was Edited successfully!',
          timer: 2000,
          showConfirmButton: false
        });
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error('Edited error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while Editing the employee!'
        });
      }
    });
  }
}
  close():void{
            this.router.navigateByUrl(`/home`);


  }
 

  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.employeeForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['invalidMobile']) {
        return 'Mobile must be 11 digits and start with 010, 011, or 012';
      }
    }
    return '';
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
