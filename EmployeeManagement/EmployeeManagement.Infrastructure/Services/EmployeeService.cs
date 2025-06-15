using EmployeeManagement.Application.Application.DTOs;
using EmployeeManagement.Application.Application.Interfaces;
using EmployeeManagement.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using EmployeeManagement.API.Entities;

namespace EmployeeManagement.Infrastructure.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly EmployeeDbContext _context;

        public EmployeeService(EmployeeDbContext context)
        {
            _context = context;
        }

        public async Task<List<EmployeeDto>> GetEmployees(string search, string sortCol, string sortDir, int pageNum, int pageSize)
        {
            var employees = await _context.Employees
                .FromSqlRaw("EXEC sp_GetEmployees @Search={0}, @SortColumn={1}, @SortDirection={2}, @PageNumber={3}, @PageSize={4}",
                            search, sortCol, sortDir, pageNum, pageSize)
                .ToListAsync();

            return employees.Select(e => new EmployeeDto
            {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                Phone = e.Phone,
                Address = e.Address
            }).ToList();
        }

        public async Task AddEmployee(EmployeeDto dto)
        {
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_AddEmployee @p0, @p1, @p2, @p3",
                dto.Name, dto.Email, dto.Phone, dto.Address);
        }

        public async Task UpdateEmployee(EmployeeDto dto)
        {
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateEmployee @p0, @p1, @p2, @p3, @p4",
                dto.Id, dto.Name, dto.Email, dto.Phone, dto.Address);
        }

        public async Task DeleteEmployee(int id)
        {
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteEmployee @p0", id);
        }

        public async Task DeleteMultipleEmployees(List<int> ids)
        {
            string idsJoined = string.Join(",", ids);
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteMultipleEmployees @Ids={0}", idsJoined);
        }

        Task<List<EmployeeDto>> IEmployeeService.GetEmployees(string search, string sortCol, string sortDir, int pageNum, int pageSize)
        {
            throw new NotImplementedException();
        }

        //public Task AddEmployee(EmployeeDto dto)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task UpdateEmployee(EmployeeDto dto)
        //{
        //    throw new NotImplementedException();
        //}
        //public Task AddEmployee(EmployeeDto dto)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task DeleteEmployee(int id)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task DeleteMultipleEmployees(List<int> ids)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task<List<EmployeeDto>> GetEmployees(string search, string sortCol, string sortDir, int pageNum, int pageSize)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task UpdateEmployee(EmployeeDto dto)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
