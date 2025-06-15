using System;
using System.Collections.Generic;

namespace EmployeeManagement.Infrastructure.Models;

public partial class Employee
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public DateTime? CreatedAt { get; set; }
}
