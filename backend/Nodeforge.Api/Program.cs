using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;
using Nodeforge.Api.Endpoints;
using Nodeforge.Api.Middleware;
using Nodeforge.Api.Repositories;
using Nodeforge.Api.Security;
using Nodeforge.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// ---------------------------------------------------------------------
// Configuration-driven settings (appsettings.json / environment variables).
// In production, set these via environment variables or a secrets
// manager — never commit real values to appsettings.json.
//   NODEFORGE_ADMIN_APIKEY   -> Admin:ApiKey
//   NODEFORGE_CORS_ORIGINS   -> Cors:AllowedOrigins (comma-separated)
// ---------------------------------------------------------------------

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? Array.Empty<string>();

// ---------------------------------------------------------------------
// Dependency injection
// ---------------------------------------------------------------------

builder.Services.AddSingleton<IApplicationRepository, JsonFileApplicationRepository>();
builder.Services.AddScoped<IApplicationService, ApplicationService>();

builder.Services.AddEndpointsApiExplorer();

// CORS: explicit origins, methods, and headers only — no wildcard.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .WithMethods("GET", "POST")
            .WithHeaders("Content-Type", "X-Api-Key");
    });
});

// Rate limiting: throttle the public submit endpoint so it can't be
// spammed (form abuse, scripted mass-submission, cheap DoS vector).
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.AddFixedWindowLimiter("application-submit", limiterOptions =>
    {
        limiterOptions.PermitLimit = 5;
        limiterOptions.Window = TimeSpan.FromMinutes(10);
        limiterOptions.QueueLimit = 0;
        limiterOptions.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    });
});

var app = builder.Build();

// ---------------------------------------------------------------------
// Middleware pipeline — order matters.
// ---------------------------------------------------------------------

app.UseMiddleware<ExceptionHandlingMiddleware>();   // catches everything below it
app.UseMiddleware<SecurityHeadersMiddleware>();     // stamps every response

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}
app.UseHttpsRedirection();

app.UseCors();
app.UseRateLimiter();

app.UseMiddleware<ApiKeyAuthMiddleware>();          // guards /api/admin/*

// ---------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------

app.MapGet("/", () => Results.Ok(new { status = "Nodeforge API is running" }));

app.MapApplicationEndpoints();

app.Run();
