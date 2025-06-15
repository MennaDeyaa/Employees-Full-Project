using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace EmployeeManagement.Infrastructure.Services
{
    public class PhoneValidationService
    {
        private readonly HttpClient _httpClient;
        private readonly string _veriphoneApiKey = "9981A74C6B3742F6B0F8F3610E8D5656";

        public PhoneValidationService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<bool> IsPhoneNumberValid(string phoneNumber)
        {
            var url = $"https://api.veriphone.io/v2/verify?phone={phoneNumber}&key={_veriphoneApiKey}";

            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
                return false;

            var json = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(json);
            if (doc.RootElement.TryGetProperty("phone_valid", out var validProp))
            {
                return validProp.GetBoolean();
            }

            return false;
        }
    }
}
