namespace Nodeforge.Api.Security;

/// <summary>
/// Guards any request path under /api/admin/* with a shared API key,
/// sent by the caller as the "X-Api-Key" header. This is intentionally
/// simple (no user accounts, no tokens to expire) — good enough for a
/// single-team internal dashboard. Swap for real auth (JWT/OAuth) if
/// multiple people with different permission levels need access.
/// </summary>
public class ApiKeyAuthMiddleware
{
    private const string ApiKeyHeaderName = "X-Api-Key";
    private const string ProtectedPathPrefix = "/api/admin";

    private readonly RequestDelegate _next;
    private readonly ILogger<ApiKeyAuthMiddleware> _logger;

    public ApiKeyAuthMiddleware(RequestDelegate next, ILogger<ApiKeyAuthMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, IConfiguration configuration)
    {
        if (!context.Request.Path.StartsWithSegments(ProtectedPathPrefix))
        {
            await _next(context);
            return;
        }

        var configuredKey = configuration["Admin:ApiKey"];

        if (string.IsNullOrWhiteSpace(configuredKey))
        {
            // Fail closed: if no key is configured, the admin area is
            // unreachable rather than silently open to anyone.
            _logger.LogError(
                "Admin:ApiKey is not configured — admin endpoints are locked until it is set.");
            context.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
            await context.Response.WriteAsJsonAsync(new
            {
                error = "Admin API is not configured on this server."
            });
            return;
        }

        var providedKey = context.Request.Headers[ApiKeyHeaderName].FirstOrDefault();

        if (string.IsNullOrEmpty(providedKey) ||
            !CryptographicallySafeEquals(providedKey, configuredKey))
        {
            _logger.LogWarning(
                "Rejected admin request from {RemoteIp}: missing or invalid API key.",
                context.Connection.RemoteIpAddress);
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(new
            {
                error = "Missing or invalid API key. Send it as the 'X-Api-Key' header."
            });
            return;
        }

        await _next(context);
    }

    /// <summary>
    /// Constant-time string comparison so response timing can't be used
    /// to guess the API key one character at a time.
    /// </summary>
    private static bool CryptographicallySafeEquals(string a, string b)
    {
        var bytesA = System.Text.Encoding.UTF8.GetBytes(a);
        var bytesB = System.Text.Encoding.UTF8.GetBytes(b);
        return System.Security.Cryptography.CryptographicOperations.FixedTimeEquals(bytesA, bytesB);
    }
}
