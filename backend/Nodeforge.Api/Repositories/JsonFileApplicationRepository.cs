using System.Text.Json;
using Nodeforge.Api.Models;

namespace Nodeforge.Api.Repositories;

/// <summary>
/// Starter storage: a JSON file next to the app. Fine for low volume /
/// getting started, but has no query capability and doesn't scale to
/// concurrent writers across multiple app instances. Swap for
/// EF Core + a real database before relying on this in production.
/// </summary>
public class JsonFileApplicationRepository : IApplicationRepository
{
    private readonly string _dataFile;
    private readonly SemaphoreSlim _fileLock = new(1, 1);
    private readonly ILogger<JsonFileApplicationRepository> _logger;

    public JsonFileApplicationRepository(
        IConfiguration configuration,
        ILogger<JsonFileApplicationRepository> logger)
    {
        _logger = logger;
        var fileName = configuration["Storage:ApplicationsFile"] ?? "applications.json";
        _dataFile = Path.Combine(AppContext.BaseDirectory, fileName);
    }

    public async Task<InternshipApplication> AddAsync(InternshipApplication application)
    {
        await _fileLock.WaitAsync();
        try
        {
            var apps = await ReadAllInternalAsync();
            apps.Add(application);
            await WriteAllInternalAsync(apps);
            _logger.LogInformation(
                "New internship application stored: {Id} for role {Role}",
                application.Id, application.Role);
            return application;
        }
        finally
        {
            _fileLock.Release();
        }
    }

    public async Task<IReadOnlyList<InternshipApplication>> GetAllAsync()
    {
        await _fileLock.WaitAsync();
        try
        {
            var apps = await ReadAllInternalAsync();
            return apps.OrderByDescending(a => a.SubmittedAt).ToList();
        }
        finally
        {
            _fileLock.Release();
        }
    }

    private async Task<List<InternshipApplication>> ReadAllInternalAsync()
    {
        if (!File.Exists(_dataFile)) return new List<InternshipApplication>();

        var json = await File.ReadAllTextAsync(_dataFile);
        if (string.IsNullOrWhiteSpace(json)) return new List<InternshipApplication>();

        try
        {
            return JsonSerializer.Deserialize<List<InternshipApplication>>(json) ?? new();
        }
        catch (JsonException ex)
        {
            // Corrupt data file shouldn't take the whole API down — log it
            // and fail safe with an empty list rather than throwing.
            _logger.LogError(ex, "applications.json is corrupt or unreadable.");
            return new List<InternshipApplication>();
        }
    }

    private async Task WriteAllInternalAsync(List<InternshipApplication> apps)
    {
        var json = JsonSerializer.Serialize(apps, new JsonSerializerOptions { WriteIndented = true });
        var tempFile = _dataFile + ".tmp";

        // Write to a temp file then move it into place — avoids leaving a
        // half-written, corrupt applications.json if the process dies mid-write.
        await File.WriteAllTextAsync(tempFile, json);
        File.Move(tempFile, _dataFile, overwrite: true);
    }
}
