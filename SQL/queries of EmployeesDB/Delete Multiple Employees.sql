CREATE PROCEDURE sp_DeleteMultipleEmployees
    @Ids NVARCHAR(MAX)
AS
BEGIN
    DECLARE @Sql NVARCHAR(MAX)
    SET @Sql = 'DELETE FROM Employees WHERE Id IN (' + @Ids + ')'
    EXEC sp_executesql @Sql
END;
