using Microsoft.AspNetCore.RateLimiting;
using Nodeforge.Api.Dtos;
using Nodeforge.Api.Services;

namespace Nodeforge.Api.Endpoints;

public static class ApplicationEndpoints
{
    public static void MapApplicationEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/applications")
            .WithTags("Applications");

        // Public: submit a new internship application. Rate-limited (see
        // Program.cs) so the form can't be spammed or scraped for a DoS.
        group.MapPost("/", async (ApplicationCreateRequest request, IApplicationService service) =>
            {
                var errors = ValidationHelper.Validate(request);
                if (errors.Count > 0)
                {
                    return Results.ValidationProblem(errors);
                }

                var created = await service.SubmitAsync(request);
                return Results.Created($"/api/applications/{created.Id}", created);
            })
            .RequireRateLimiting("application-submit")
            .Produces<object>(StatusCodes.Status201Created)
            .ProducesValidationProblem();

        // Admin-only: list all applications. Protected by ApiKeyAuthMiddleware
        // (see Security/ApiKeyAuthMiddleware.cs) via the /api/admin prefix.
        app.MapGroup("/api/admin/applications")
            .WithTags("Admin")
            .MapGet("/", async (IApplicationService service) =>
            {
                var apps = await service.ListAllAsync();
                return Results.Ok(apps);
            });
    }
}
