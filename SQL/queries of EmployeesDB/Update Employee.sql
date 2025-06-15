CREATE PROCEDURE sp_UpdateEmployee
    @Id INT,
    @Name NVARCHAR(100),
    @Email NVARCHAR(100),
    @Phone NVARCHAR(20),
    @Address NVARCHAR(200)
AS
BEGIN
    UPDATE Employees
    SET Name = @Name,
        Email = @Email,
        Phone = @Phone,
        Address = @Address
    WHERE Id = @Id;
END;
