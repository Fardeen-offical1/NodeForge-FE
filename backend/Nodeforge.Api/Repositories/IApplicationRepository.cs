using Nodeforge.Api.Models;

namespace Nodeforge.Api.Repositories;

/// <summary>
/// Abstracts *how* applications are stored. The rest of the app only
/// depends on this interface, so swapping the JSON file for a real
/// database later (SQL Server, Postgres, etc.) means writing one new
/// class — nothing in Services/Endpoints has to change.
/// </summary>
public interface IApplicationRepository
{
    Task<InternshipApplication> AddAsync(InternshipApplication application);
    Task<IReadOnlyList<InternshipApplication>> GetAllAsync();
}
