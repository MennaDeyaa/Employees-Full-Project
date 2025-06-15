# EmployeesDB SQL Scripts

This folder contains all the SQL scripts used to create and manage the **EmployeesDB** database.  
Each operation has been separated into its own `.sql` file for clarity and modularity.

## 📁 Included Scripts

| File Name                        | Description                              |
|----------------------------------|------------------------------------------|
| `SQLQuery1.sql`                  | Creates the `Employees` table            |
| `Get Employees (Search + Sort + Pagination).sql`   | Stored procedure to get employees with search, sort, and pagination |
| `Add Employee.sql`               | Stored procedure to add a new employee   |
| `Update Employee.sql`            | Stored procedure to update employee data |
| `Delete Single Employee.sql`     | Stored procedure to delete a single employee |
| `Delete Multiple Employees.sql`  | Stored procedure to delete multiple employees by a list of IDs |
| `EXEC.sql`                       | Script to insert sample employees using `sp_AddEmployee` |


## 💡 Usage

You can run each script individually in SQL Server Management Studio (SSMS) to recreate the database structure and functionality.

1. Start by executing `SQLQuery1.sql`.
2. Then run the stored procedure scripts in order as needed.

> ⚠️ Make sure you're using the correct database context before running the scripts.

## 🗂️ Notes

- These scripts are part of the Employee Management System project.
- The database follows a **Database-First** approach.
- All stored procedures use parameterized inputs for security and clarity.

