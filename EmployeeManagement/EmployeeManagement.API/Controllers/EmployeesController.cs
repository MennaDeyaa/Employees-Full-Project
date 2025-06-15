using EmployeeManagement.Infrastructure.Models;
using EmployeeManagement.Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using EmployeeManagement.API.NewFolder;

namespace EmployeeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
       
        
            private readonly EmployeeDbContext _context;
        private readonly OtpGenerator _otpGenerator;
        private readonly OtpSenderService _otpSender;
        private readonly PhoneValidationService _phoneValidator;

        public EmployeesController(EmployeeDbContext context, OtpGenerator otpGenerator,
    OtpSenderService otpSender,
    PhoneValidationService phoneValidator)
            {
                _context = context;
            _otpGenerator = otpGenerator;
            _otpSender = otpSender;
            _phoneValidator = phoneValidator;
        }

            // GET: api/Employees
            [HttpGet]
            public async Task<IActionResult> GetEmployees(
                string? search,
                string sortColumn = "Name",
                string sortDirection = "ASC",
                int pageNumber = 1,
                int pageSize = 10)
            {
                var employees = await _context.GetEmployeesAsync(search, sortColumn, sortDirection, pageNumber, pageSize);
                return Ok(employees);
            }

            // POST: api/Employees
            [HttpPost]
            public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
            {
                await _context.AddEmployeeAsync(employee);
                return Ok(new { message = "Employee added successfully" });
            }

            // PUT: api/Employees/5
            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateEmployee(int id, [FromBody] Employee employee)
            {
                if (id != employee.Id)
                    return BadRequest("ID mismatch");

                await _context.UpdateEmployeeAsync(employee);
                return Ok(new { message = "Employee updated successfully" });
            }

            // DELETE: api/Employees/5
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteEmployee(int id)
            {
                await _context.DeleteEmployeeAsync(id);
                return Ok(new { message = "Employee deleted successfully" });
            }

            // DELETE: api/Employees/delete-multiple?ids=1,2,3
            [HttpDelete("delete-multiple")]
            public async Task<IActionResult> DeleteMultipleEmployees([FromQuery] string ids)
            {
                await _context.DeleteMultipleEmployeesAsync(ids);
                return Ok(new { message = "Selected employees deleted successfully" });
            }
        // GET: api/Employees/14
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
                return NotFound(new { message = "Employee not found" });

            return Ok(employee);
        }
        [HttpGet("count")]
        public async Task<IActionResult> GetEmployeeCount()
        {
            var count = await _context.Employees.CountAsync();
            return Ok(new { totalCount = count });
        }

        [HttpPost("send/whatsApp")]
        public async Task<IActionResult> SendOtp([FromBody] OtpRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.PhoneNumber))
                return BadRequest("PhoneNumber is required.");

            bool isValid = await _phoneValidator.IsPhoneNumberValid(request.PhoneNumber);
            if (!isValid)
                return BadRequest("Invalid phone number.");

            var otp = _otpGenerator.GenerateOtp();

            string messageType = request.Type?.ToLower() == "whatsapp" ? "whatsapp" : "sms";

            await _otpSender.SendMessage(request.PhoneNumber, otp, messageType);

            return Ok(new
            {
                message = "OTP Sent Successfully",
                otp = otp
            });
        }




    }
}
