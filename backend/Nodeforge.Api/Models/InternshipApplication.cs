namespace Nodeforge.Api.Models;

public class InternshipApplication
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string? City { get; set; }
    public string? Education { get; set; }
    public string? Year { get; set; }
    public string Role { get; set; } = "";
    public string? Skills { get; set; }
    public string? Experience { get; set; }
    public string? Portfolio { get; set; }
    public string? Hours { get; set; }
    public string? Start { get; set; }
    public string UnpaidOk { get; set; } = "";
    public string? Why { get; set; }
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}
