using System.Text.Json;

namespace Nodeforge.Api.Middleware;

/// <summary>
/// Catches any unhandled exception, logs the real details server-side,
/// and returns a generic error to the client. Prevents stack traces,
/// file paths, or internal exception messages from ever leaking in a
/// response — that's an information-disclosure risk in production.
/// </summary>
public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;
    private readonly IHostEnvironment _environment;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger,
        IHostEnvironment environment)
    {
        _next = next;
        _logger = logger;
        _environment = environment;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception processing {Method} {Path}",
                context.Request.Method, context.Request.Path);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            var payload = _environment.IsDevelopment()
                ? new { error = "An unexpected error occurred.", detail = ex.Message }
                : new { error = "An unexpected error occurred.", detail = (string?)null };

            await context.Response.WriteAsync(JsonSerializer.Serialize(payload));
        }
    }
}
