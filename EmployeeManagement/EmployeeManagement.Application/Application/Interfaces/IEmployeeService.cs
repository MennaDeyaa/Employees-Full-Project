using EmployeeManagement.Application.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Application.Application.Interfaces
{
    public interface IEmployeeService
    {
        Task<List<EmployeeDto>> GetEmployees(string search, string sortCol, string sortDir, int pageNum, int pageSize);
        Task AddEmployee(EmployeeDto dto);
        Task UpdateEmployee(EmployeeDto dto);
        Task DeleteEmployee(int id);
        Task DeleteMultipleEmployees(List<int> ids);
    }
}
