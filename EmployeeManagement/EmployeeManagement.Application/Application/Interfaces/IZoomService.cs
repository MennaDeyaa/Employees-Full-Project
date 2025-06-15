using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Application.Application.Interfaces
{
    public interface IZoomService
    {
        Task<string> CreateMeetingAsync();
    }
}
