using System.ComponentModel.DataAnnotations;

namespace Nodeforge.Api.Dtos;

public static class ValidationHelper
{
    /// <summary>
    /// Runs DataAnnotations validation on a DTO and returns a field-keyed
    /// error dictionary (empty if valid). Minimal APIs don't auto-validate
    /// DataAnnotations the way [ApiController] MVC controllers do, so
    /// endpoints call this explicitly before touching business logic.
    /// </summary>
    public static Dictionary<string, string[]> Validate<T>(T model) where T : notnull
    {
        var context = new ValidationContext(model);
        var results = new List<ValidationResult>();
        Validator.TryValidateObject(model, context, results, validateAllProperties: true);

        return results
            .SelectMany(r => r.MemberNames.DefaultIfEmpty(""))
            .Distinct()
            .ToDictionary(
                member => member,
                member => results
                    .Where(r => r.MemberNames.Contains(member) || (member == "" && !r.MemberNames.Any()))
                    .Select(r => r.ErrorMessage ?? "Invalid value.")
                    .ToArray()
            );
    }
}
