using EmployeeManagement.Application.Application.Interfaces;
using EmployeeManagement.Infrastructure.Models;
using EmployeeManagement.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);
// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDevClient",
        policy => policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<EmployeeDbContext>();
//builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<OtpGenerator>();
builder.Services.AddScoped<OtpSenderService>();
builder.Services.AddHttpClient<PhoneValidationService>();
builder.Services.AddScoped<ZoomService>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection(); // Optional but good practice

// Enable CORS
app.UseCors("AllowAngularDevClient");

app.UseAuthorization();

app.MapControllers();

app.Run();
