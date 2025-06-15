import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Employee } from '../interfaces/employee';

// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

     private apiUrl='http://localhost:5139/api/Employees';

  constructor(
    // private _HttpClient:HttpClient
  ) { }
  private readonly _HttpClient = inject(HttpClient);

 
    // GET: Get employees with search, sort, and pagination
  getEmployees(
    search?: string, 
    sortColumn: string = 'Name', 
    sortDirection: string = 'ASC', 
    pageNumber: number = 1, 
    pageSize: number = 10
  ): Observable<Employee[]> {
    let params = new HttpParams()
      .set('sortColumn', sortColumn)
      .set('sortDirection', sortDirection)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    // Only add search parameter if it has a value
    if (search && search.trim()) {
      params = params.set('search', search.trim());
    }return this._HttpClient.get<Employee[]>(this.apiUrl, { params });
  }
  //tnazoly by name 
    getEmployeesByNameDESC(
    search?: string, 
    sortColumn: string = 'Name', 
    sortDirection: string = 'DESC', 
    pageNumber: number = 1, 
    pageSize: number = 10
  ): Observable<Employee[]> {
    let params = new HttpParams()
      .set('sortColumn', sortColumn)
      .set('sortDirection', sortDirection)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    // Only add search parameter if it has a value
    if (search && search.trim()) {
      params = params.set('search', search.trim());
    }return this._HttpClient.get<Employee[]>(this.apiUrl, { params });
  }//tnazoly by name 
    getEmployeesByEmailASC(
    search?: string, 
    sortColumn: string = 'Email', 
    sortDirection: string = 'ASC', 
    pageNumber: number = 1, 
    pageSize: number = 10
  ): Observable<Employee[]> {
    let params = new HttpParams()
      .set('sortColumn', sortColumn)
      .set('sortDirection', sortDirection)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    // Only add search parameter if it has a value
    if (search && search.trim()) {
      params = params.set('search', search.trim());
    }return this._HttpClient.get<Employee[]>(this.apiUrl, { params });
  }
  //tnazoly by name 
    getEmployeesByEmailDESC(
    search?: string, 
    sortColumn: string = 'Email', 
    sortDirection: string = 'DESC', 
    pageNumber: number = 1, 
    pageSize: number = 10
  ): Observable<Employee[]> {
    let params = new HttpParams()
      .set('sortColumn', sortColumn)
      .set('sortDirection', sortDirection)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    // Only add search parameter if it has a value
    if (search && search.trim()) {
      params = params.set('search', search.trim());
    }return this._HttpClient.get<Employee[]>(this.apiUrl, { params });
  }
  // POST: Add new employee
  addEmployee(employee: Employee): Observable<any> {
    return this._HttpClient.post<any>(this.apiUrl, employee);
  }

  // PUT: Update existing employee
  updateEmployee(id: number, employee: Employee): Observable<any> {
    return this._HttpClient.put<any>(`${this.apiUrl}/${id}`, employee);
  }

  // DELETE: Delete single employee
  deleteEmployee(id: number): Observable<any> {
    return this._HttpClient.delete<any>(`${this.apiUrl}/${id}`);
  }

  // DELETE: Delete multiple employees
  deleteMultipleEmployees(ids: number[]): Observable<any> {
    const idsString = ids.join(',');
    const params = new HttpParams().set('ids', idsString);
    
    return this._HttpClient.delete<any>(`${this.apiUrl}/delete-multiple`, { params });
  }

 getEmployeeById(id: number) {
  return this._HttpClient.get<any>(`${this.apiUrl}/${id}`);
}
getTotalEmployeeCount() {
  return this._HttpClient.get<{ totalCount: number }>(`${this.apiUrl}/count`);
}

 

  // addEmployee(employee: Employee): void {
  //   employee.id = this.getNextId();
  //   this.employees.push(employee);
  //   this.employeesSubject.next([...this.employees]);
  // }

  // updateEmployee(updatedEmployee: Employee): void {
  //   const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
  //   if (index !== -1) {
  //     this.employees[index] = updatedEmployee;
  //     this.employeesSubject.next([...this.employees]);
  //   }
  // }

  // deleteEmployee(id: number): void {
  //   this.employees = this.employees.filter(emp => emp.id !== id);
  //   this.employeesSubject.next([...this.employees]);
  // }

  // deleteMultipleEmployees(ids: number[]): void {
  //   this.employees = this.employees.filter(emp => !ids.includes(emp.id));
  //   this.employeesSubject.next([...this.employees]);
  // }

  // getEmployeeById(id: number): Employee | undefined {
  //   return this.employees.find(emp => emp.id === id);
  // }

  // private getNextId(): number {
  //   return Math.max(...this.employees.map(emp => emp.id)) + 1;
  // }
}
