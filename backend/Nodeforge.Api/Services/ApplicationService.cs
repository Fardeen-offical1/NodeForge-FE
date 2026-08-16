using System.Text.RegularExpressions;
using Nodeforge.Api.Dtos;
using Nodeforge.Api.Models;
using Nodeforge.Api.Repositories;

namespace Nodeforge.Api.Services;

public class ApplicationService : IApplicationService
{
    private readonly IApplicationRepository _repository;
    private static readonly Regex TagStripper = new("<[^>]*>", RegexOptions.Compiled);

    public ApplicationService(IApplicationRepository repository)
    {
        _repository = repository;
    }

    public async Task<InternshipApplication> SubmitAsync(ApplicationCreateRequest request)
    {
        var application = new InternshipApplication
        {
            Name = Sanitize(request.Name),
            Email = request.Email.Trim().ToLowerInvariant(),
            Phone = Sanitize(request.Phone),
            City = SanitizeOptional(request.City),
            Education = SanitizeOptional(request.Education),
            Year = SanitizeOptional(request.Year),
            Role = Sanitize(request.Role),
            Skills = SanitizeOptional(request.Skills),
            Experience = SanitizeOptional(request.Experience),
            Portfolio = SanitizeOptional(request.Portfolio),
            Hours = SanitizeOptional(request.Hours),
            Start = SanitizeOptional(request.Start),
            UnpaidOk = request.UnpaidOk,
            Why = SanitizeOptional(request.Why),
        };

        return await _repository.AddAsync(application);
    }

    public Task<IReadOnlyList<InternshipApplication>> ListAllAsync() =>
        _repository.GetAllAsync();

    /// <summary>
    /// Defense-in-depth: strips any HTML/script tags from free-text input.
    /// This data may end up rendered in an admin dashboard someday — better
    /// it's already clean than relying solely on the renderer to escape it.
    /// </summary>
    private static string Sanitize(string input) =>
        TagStripper.Replace(input, "").Trim();

    private static string? SanitizeOptional(string? input) =>
        string.IsNullOrWhiteSpace(input) ? null : Sanitize(input);
}
