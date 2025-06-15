using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Infrastructure.Services
{
    public class OtpGenerator
    {
        public string GenerateOtp(int length = 6)
        {
            var random = new Random();
            var otp = "";
            for (int i = 0; i < length; i++)
            {
                otp += random.Next(0, 10);
            }
            return otp;
        }
    }
}
