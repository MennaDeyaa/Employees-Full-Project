//using Microsoft.Data.SqlClient;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;

//namespace EmployeeManagement.Infrastructure.Models;

//public partial class EmployeeDbContext : DbContext
//{
//    public EmployeeDbContext()
//    {
//    }

//    public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options)
//        : base(options)
//    {
//    }

//    public virtual DbSet<Employee> Employees { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Data Source= DESKTOP-F61R0CS\\SQLEXPRESS;Initial Catalog= EmployeeDb;Integrated Security =true;TrustServerCertificate=True;");

//    protected override void OnModelCreating(ModelBuilder modelBuilder)
//    {
//        modelBuilder.Entity<Employee>(entity =>
//        {
//            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC07C3CB5362");

//            entity.Property(e => e.Address).HasMaxLength(200);
//            entity.Property(e => e.CreatedAt)
//                .HasDefaultValueSql("(getdate())")
//                .HasColumnType("datetime");
//            entity.Property(e => e.Email).HasMaxLength(100);
//            entity.Property(e => e.Name).HasMaxLength(100);
//            entity.Property(e => e.Phone).HasMaxLength(20);
//        });

//        OnModelCreatingPartial(modelBuilder);
//    }

//    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

//    public async Task<List<Employee>> GetEmployeesAsync(string? search, string sortColumn, string sortDirection, int pageNumber, int pageSize)
//    {
//        var searchParam = new SqlParameter("@Search", search ?? (object)DBNull.Value);
//        var sortColumnParam = new SqlParameter("@SortColumn", sortColumn);
//        var sortDirectionParam = new SqlParameter("@SortDirection", sortDirection);
//        var pageNumberParam = new SqlParameter("@PageNumber", pageNumber);
//        var pageSizeParam = new SqlParameter("@PageSize", pageSize);

//        var result = await _context.Employees
//            .FromSqlRaw("EXEC sp_GetEmployees @Search, @SortColumn, @SortDirection, @PageNumber, @PageSize",
//                searchParam, sortColumnParam, sortDirectionParam, pageNumberParam, pageSizeParam)
//            .ToListAsync();

//        return result;
//    }

//    // Add Employee
//    public async Task AddEmployeeAsync(Employee employee)
//    {
//        await _context.Database.ExecuteSqlRawAsync(
//            "EXEC sp_AddEmployee @Name, @Email, @Phone, @Address",
//            new SqlParameter("@Name", employee.Name),
//            new SqlParameter("@Email", employee.Email),
//            new SqlParameter("@Phone", employee.Phone),
//            new SqlParameter("@Address", employee.Address)
//        );
//    }

//    // Update Employee
//    public async Task UpdateEmployeeAsync(Employee employee)
//    {
//        await _context.Database.ExecuteSqlRawAsync(
//            "EXEC sp_UpdateEmployee @Id, @Name, @Email, @Phone, @Address",
//            new SqlParameter("@Id", employee.Id),
//            new SqlParameter("@Name", employee.Name),
//            new SqlParameter("@Email", employee.Email),
//            new SqlParameter("@Phone", employee.Phone),
//            new SqlParameter("@Address", employee.Address)
//        );
//    }

//    // Delete Single Employee
//    public async Task DeleteEmployeeAsync(int id)
//    {
//        await _context.Database.ExecuteSqlRawAsync(
//            "EXEC sp_DeleteEmployee @Id",
//            new SqlParameter("@Id", id)
//        );
//    }

//    // Delete Multiple Employees
//    public async Task DeleteMultipleEmployeesAsync(string idsCsv)
//    {
//        await _context.Database.ExecuteSqlRawAsync(
//            "EXEC sp_DeleteMultipleEmployees @Ids",
//            new SqlParameter("@Ids", idsCsv)
//        );
//    }
//}
//}

using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagement.Infrastructure.Models
{
    public partial class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext()
        {
        }

        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Employee> Employees { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, move it to configuration.
            => optionsBuilder.UseSqlServer("Data Source=DESKTOP-NS3ESML\\SQL2022;Initial Catalog=EmployeeDb;Integrated Security=true;TrustServerCertificate=True;");
        //        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //#warning To protect potentially sensitive information in your connection string, move it to configuration.
        //       => optionsBuilder.UseSqlServer("Data Source=DESKTOP-SF5FFA4\\SQLEXPRESS01;Initial Catalog=EmployeeDb;Integrated Security=true;TrustServerCertificate=True;");
        //DESKTOP-F61R0CS\SQLEXPRESS
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Address).HasMaxLength(200);
                entity.Property(e => e.CreatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime");
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Phone).HasMaxLength(20);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        // ✅ Get Employees with Paging, Searching, Sorting
        public async Task<List<Employee>> GetEmployeesAsync(string? search, string sortColumn, string sortDirection, int pageNumber, int pageSize)
        {
            var searchParam = new SqlParameter("@Search", string.IsNullOrWhiteSpace(search) ? DBNull.Value : search);
            var sortColumnParam = new SqlParameter("@SortColumn", sortColumn);
            var sortDirectionParam = new SqlParameter("@SortDirection", sortDirection);
            var pageNumberParam = new SqlParameter("@PageNumber", pageNumber);
            var pageSizeParam = new SqlParameter("@PageSize", pageSize);

            return await Employees
                .FromSqlRaw("EXEC sp_GetEmployees @Search, @SortColumn, @SortDirection, @PageNumber, @PageSize",
                    searchParam, sortColumnParam, sortDirectionParam, pageNumberParam, pageSizeParam)
                .ToListAsync();
        }

        // ✅ Add Employee
        public async Task AddEmployeeAsync(Employee employee)
        {
            await Database.ExecuteSqlRawAsync(
                "EXEC sp_AddEmployee @Name, @Email, @Phone, @Address",
                new SqlParameter("@Name", employee.Name),
                new SqlParameter("@Email", employee.Email),
                new SqlParameter("@Phone", employee.Phone),
                new SqlParameter("@Address", employee.Address)
            );
        }

        // ✅ Update Employee
        public async Task UpdateEmployeeAsync(Employee employee)
        {
            await Database.ExecuteSqlRawAsync(
                "EXEC sp_UpdateEmployee @Id, @Name, @Email, @Phone, @Address",
                new SqlParameter("@Id", employee.Id),
                new SqlParameter("@Name", employee.Name),
                new SqlParameter("@Email", employee.Email),
                new SqlParameter("@Phone", employee.Phone),
                new SqlParameter("@Address", employee.Address)
            );
        }

        // ✅ Delete Single Employee
        public async Task DeleteEmployeeAsync(int id)
        {
            await Database.ExecuteSqlRawAsync(
                "EXEC sp_DeleteEmployee @Id",
                new SqlParameter("@Id", id)
            );
        }

        // ✅ Delete Multiple Employees
        public async Task DeleteMultipleEmployeesAsync(string idsCsv)
        {
            await Database.ExecuteSqlRawAsync(
                "EXEC sp_DeleteMultipleEmployees @Ids",
                new SqlParameter("@Ids", idsCsv)
            );
        }
    }
}

