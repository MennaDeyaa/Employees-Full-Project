CREATE PROCEDURE sp_AddEmployee
    @Name NVARCHAR(100),
    @Email NVARCHAR(100),
    @Phone NVARCHAR(20),
    @Address NVARCHAR(200)
AS
BEGIN
    INSERT INTO Employees (Name, Email, Phone, Address)
    VALUES (@Name, @Email, @Phone, @Address);
END;
