using EmployeeManagement.Application.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using EmployeeManagement.Infrastructure.NewFolder;


namespace EmployeeManagement.Infrastructure.Services
{
    public class ZoomService
    {
        private readonly HttpClient _httpClient;

        private readonly IConfiguration _config;

        public ZoomService(IConfiguration config)
        {
            _httpClient = new HttpClient();
            _config = config;
        }

        private async Task<string> GetAccessTokenAsync()
        {
            var accountId = _config["Zoom:AccountId"];
            var clientId = _config["Zoom:ClientId"];
            var clientSecret = _config["Zoom:ClientSecret"];

            var requestBody = new StringContent($"grant_type=account_credentials&account_id={accountId}", Encoding.UTF8, "application/x-www-form-urlencoded");
            var authHeader = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));

            var request = new HttpRequestMessage(HttpMethod.Post, "https://zoom.us/oauth/token");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", authHeader);
            request.Content = requestBody;

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            var tokenData = JsonSerializer.Deserialize<JsonElement>(json);
            return tokenData.GetProperty("access_token").GetString();
        }

        public async Task<zoomResponse?> CreateMeetingAsync()
        {
            var accessToken = await GetAccessTokenAsync();

            var meetingData = new
            {
                topic = "Test Meeting",
                type = 2,
                start_time = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                duration = 30,
                timezone = "UTC"
            };

            var json = JsonSerializer.Serialize(meetingData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.zoom.us/v2/users/me/meetings");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            request.Content = content;

            var response = await _httpClient.SendAsync(request);
            var responseJson = await response.Content.ReadAsStringAsync();

            Console.WriteLine("======== Zoom API Response Debugging ========");
            Console.WriteLine($"HTTP Status: {response.StatusCode}");
            Console.WriteLine($"Response JSON: {responseJson}");
            Console.WriteLine("============================================");

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Zoom API error: {responseJson}");
            }

            var zoomResponse = JsonSerializer.Deserialize<zoomResponse>(responseJson);

            return zoomResponse;
        }

    }
}
