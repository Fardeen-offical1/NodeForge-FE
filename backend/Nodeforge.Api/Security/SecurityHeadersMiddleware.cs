namespace Nodeforge.Api.Security;

/// <summary>
/// Adds standard defensive HTTP response headers. None of these require
/// configuration — they're safe defaults for any JSON API.
/// </summary>
public class SecurityHeadersMiddleware
{
    private readonly RequestDelegate _next;

    public SecurityHeadersMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var headers = context.Response.Headers;

        headers["X-Content-Type-Options"] = "nosniff";
        headers["X-Frame-Options"] = "DENY";
        headers["Referrer-Policy"] = "no-referrer";
        headers["Permissions-Policy"] = "geolocation=(), camera=(), microphone=()";

        // This API only ever returns JSON — a strict CSP costs nothing here
        // and blocks it from ever being used to serve/execute injected content.
        headers["Content-Security-Policy"] = "default-src 'none'; frame-ancestors 'none'";

        await _next(context);
    }
}
