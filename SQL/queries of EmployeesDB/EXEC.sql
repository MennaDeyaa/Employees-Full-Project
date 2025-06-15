EXEC sp_AddEmployee @Name='Menna', @Email='menna@gmail.com', @Phone='01012345678', @Address='Cairo';
EXEC sp_AddEmployee @Name='noone', @Email='menna@gmail.com', @Phone='01012345678', @Address='Cairo';
EXEC sp_AddEmployee @Name='neven', @Email='menna@gmail.com', @Phone='01012345678', @Address='Cairo';
EXEC sp_AddEmployee @Name='nouran', @Email='menna@gmail.com', @Phone='01012345678', @Address='Cairo';
EXEC sp_AddEmployee @Name='nada', @Email='nouran@gmail.com', @Phone='01012345678', @Address='Cairo';
EXEC sp_AddEmployee @Name='mhmd', @Email='nouran@gmail.com', @Phone='01012345678', @Address='Cairo';

SELECT * 
FROM Employees