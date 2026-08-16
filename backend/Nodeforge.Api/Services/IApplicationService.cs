using Nodeforge.Api.Dtos;
using Nodeforge.Api.Models;

namespace Nodeforge.Api.Services;

public interface IApplicationService
{
    Task<InternshipApplication> SubmitAsync(ApplicationCreateRequest request);
    Task<IReadOnlyList<InternshipApplication>> ListAllAsync();
}
