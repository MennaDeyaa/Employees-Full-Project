import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from 'src/app/shared/interfaces/employee';
import { EmployeeService } from '../../shared/services/employee.service';
import {NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { TranslateModule, TranslateService, Translation } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { FormsModule } from '@angular/forms';
import { ZoomService } from 'src/app/shared/services/zoom.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,  RouterOutlet , TranslateModule,  FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
 export class HomeComponent 
  implements OnInit
  {
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

  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;

  selectedEmployee: Employee | null = null;

 
  lastUrl: any;

  currentLang = 'en';

  isLoading = false;

  constructor(private employeeService: EmployeeService, 
private translate: TranslateService
 ,private router: Router,
private _TranslationService:TranslationService,
private zoomService: ZoomService) {
  //  this.translate.setDefaultLang('en');
  // this.translate.use('en');
 }
   changeLang(event: Event) {
  const selectedLang = (event.target as HTMLSelectElement).value;
  //  this.currentLang = selectedLang;
  // document.body.classList.remove('ltr', 'rtl');
  // document.body.classList.add(selectedLang === 'ar' ? 'rtl' : 'ltr');
    this.currentLang = selectedLang;
  this._TranslationService.setLanguage(selectedLang); // أو this.translate.use(selectedLang)
 
}



  ngOnInit(): void {
     
     this.loadEmployees();
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        // هنا حطي الكود اللي كنتي حابة تحطيه في ngOnInit
  const data = localStorage.getItem('selectedEmployees');
  this.selectedEmployees = data ? JSON.parse(data) : [];
        this.loadEmployees(); 
        // مثلاً
      });
    

  this.currentLang = this._TranslationService.getCurrentLanguage();
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
sortByNameASC(): void {
  this.sortColumn = 'Name';
this.sortDirection = 'ASC';
    this.employeeService
      .getEmployees(this.searchTerm, this.sortColumn, this.sortDirection, this.pageNumber, this.pageSize)
      .subscribe((data: Employee[]) => {
        setTimeout(() => {
          this.employees = data;
          this.paginatedEmployees = data;
        });
      });this.employeeService.getTotalEmployeeCount().subscribe({
    next: (res) => this.totalCount = res.totalCount,
    error: (err) => console.error('Error fetching total count', err)
  });
  }

  sortByNameDESC(): void {
    this.sortColumn = 'Name'; // تأكدي أن الكولمن مكتوب صح مثل ما هو في قاعدة البيانات
  this.sortDirection = 'DESC';
    this.employeeService
      .getEmployeesByNameDESC(this.searchTerm, this.sortColumn, this.sortDirection, this.pageNumber, this.pageSize)
      .subscribe((data: Employee[]) => {
        setTimeout(() => {
          this.employees = data;
          this.paginatedEmployees = data;
        });
      });this.employeeService.getTotalEmployeeCount().subscribe({
    next: (res) => this.totalCount = res.totalCount,
    error: (err) => console.error('Error fetching total count', err)
  });
  }
  sortByEmailASC(): void {
    this.sortColumn = 'Email'; // تأكدي أن الكولمن مكتوب صح مثل ما هو في قاعدة البيانات
  this.sortDirection = 'ASC';
    this.employeeService
      .getEmployeesByNameDESC(this.searchTerm, this.sortColumn, this.sortDirection, this.pageNumber, this.pageSize)
      .subscribe((data: Employee[]) => {
        setTimeout(() => {
          this.employees = data;
          this.paginatedEmployees = data;
        });
      });this.employeeService.getTotalEmployeeCount().subscribe({
    next: (res) => this.totalCount = res.totalCount,
    error: (err) => console.error('Error fetching total count', err)
  });
  }
  sortByEmailDESC(): void {
    this.sortColumn = 'Email'; // تأكدي أن الكولمن مكتوب صح مثل ما هو في قاعدة البيانات
  this.sortDirection = 'DESC';
    this.employeeService
      .getEmployeesByNameDESC(this.searchTerm, this.sortColumn, this.sortDirection, this.pageNumber, this.pageSize)
      .subscribe((data: Employee[]) => {
        setTimeout(() => {
          this.employees = data;
          this.paginatedEmployees = data;
        });
      });this.employeeService.getTotalEmployeeCount().subscribe({
    next: (res) => this.totalCount = res.totalCount,
    error: (err) => console.error('Error fetching total count', err)
  });
  }



  toggleEmployeeSelection(employeeId: number): void {
    const index = this.selectedEmployees.indexOf(employeeId);
    if (index > -1) {
      this.selectedEmployees.splice(index, 1);
    } else {
      this.selectedEmployees.push(employeeId);
    }
  }

  toggleAllEmployees(): void {
    if (this.selectedEmployees.length === this.employees.length) {
      this.selectedEmployees = [];
    } else {
      this.selectedEmployees = this.employees.map(emp => emp.id);
    }
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  openEditModal(employee: Employee): void {
    // this.selectedEmployee = { ...employee };
            this.router.navigateByUrl(`/home/edit/${employee.id}`);

    // this.showEditModal = true;
  }

  openDeleteModal(employee: Employee): void {
     this.selectedEmployee = employee;
                // this.router.navigateByUrl(`/home/delete/:${employee.id}`);

     this.showDeleteModal = true;
  }

  deleteSelectedEmployees(): void {
    if (this.selectedEmployees.length === 0) {
      return;
    }

    // You can add a confirmation dialog here if needed
    if (confirm(`Are you sure you want to delete ${this.selectedEmployees.length} selected employee(s)?`)) {
      this.employeeService.deleteMultipleEmployees(this.selectedEmployees).subscribe({
        next: (response) => {
          console.log('Employees deleted successfully:', response);
          this.loadEmployees(); // Reload the employee list
          this.selectedEmployees = []; // Clear selection
        },
        error: (error) => {
          console.error('Error deleting employees:', error);
          alert('Error deleting employees. Please try again.');
        }
      });
    }
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadEmployees();
    }
  }



nextPage(): void {
  this.pageNumber++;
  this.loadEmployees();
}
get maxPages(): number {
  return Math.ceil(this.totalCount / this.pageSize);
}



  // Header component methods merged here
  onAddEmployee(): void {
            this.router.navigateByUrl('/home/add');

    // this.openAddModal();
  }

  onDeleteSelected(): void {
        // this.router.navigateByUrl('/home/delete/:id');
     this.deleteSelectedEmployees();
  }

  // Search functionality
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.pageNumber = 1; // Reset to first page when searching
    this.loadEmployees();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.pageNumber = 1;
    this.loadEmployees();
  }

  // Modal event handlers for when you implement the modals
  closeAddModal(): void {
    this.showAddModal = false;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedEmployee = null;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedEmployee = null;
  }

  onEmployeeAdded(): void {
    this.closeAddModal();
    this.loadEmployees();
  }

  onEmployeeUpdated(): void {
    this.closeEditModal();
    this.loadEmployees();
  }

  onEmployeeDeleted(): void {
    this.closeDeleteModal();
    this.loadEmployees();
    // Also remove from selected employees if it was selected
    this.selectedEmployees = this.selectedEmployees.filter(id => id !== this.selectedEmployee?.id);
  }

  // Delete single employee (for the delete button in the table)
  deleteSingleEmployee(employee: Employee): void {
    if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
      this.employeeService.deleteEmployee(employee.id).subscribe({
        next: (response) => {
          console.log('Employee deleted successfully:', response);
          this.loadEmployees();
          // Remove from selected employees if it was selected
          this.selectedEmployees = this.selectedEmployees.filter(id => id !== employee.id);
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          alert('Error deleting employee. Please try again.');
        }
      });
    }
  }
  onDeleteOne(id: number) {
    this.router.navigate(['/home/delete'], { queryParams: { ids: id } });
  }

  onDeleteMultiple(employeeIds: number[]) {
    if (!employeeIds || employeeIds.length === 0) return;
    const idsString = employeeIds.join(',');
    this.router.navigate(['/home/delete'], { queryParams: { ids: idsString } });
  }

  //zooooommmmm
goToBackendLink() {
  this.isLoading = true;

  this.zoomService.createMeeting().subscribe({
    next: (res) => {
      this.isLoading = false;

      if (res && res.start_url) {
        Swal.fire({
          icon: 'success',
          title: 'Meeting Created!',
          text: 'You will be redirected to Zoom now.',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          window.open(res.start_url, '_blank');
        });
      }
    },
    error: (err) => {
      this.isLoading = false;
      console.error('Error creating meeting:', err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to create Zoom meeting!',
      });
    }
  });
}


  }

