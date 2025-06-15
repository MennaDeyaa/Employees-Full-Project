CREATE PROCEDURE sp_GetEmployees
    @Search NVARCHAR(100) = NULL,
    @SortColumn NVARCHAR(50) = 'Name',
    @SortDirection NVARCHAR(4) = 'ASC',
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;

    SELECT *
    FROM Employees
    WHERE (@Search IS NULL OR 
           Name LIKE '%' + @Search + '%' OR 
           Email LIKE '%' + @Search + '%' OR
           Phone LIKE '%' + @Search + '%' OR
           Address LIKE '%' + @Search + '%')
    ORDER BY
        CASE WHEN @SortColumn = 'Name' AND @SortDirection = 'ASC' THEN Name END ASC,
        CASE WHEN @SortColumn = 'Name' AND @SortDirection = 'DESC' THEN Name END DESC,
        CASE WHEN @SortColumn = 'Email' AND @SortDirection = 'ASC' THEN Email END ASC,
        CASE WHEN @SortColumn = 'Email' AND @SortDirection = 'DESC' THEN Email END DESC
    OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;
END;
