using System.ComponentModel.DataAnnotations;

namespace Nodeforge.Api.Dtos;

/// <summary>
/// What the client sends when submitting an internship application.
/// Kept separate from the domain model (Models/InternshipApplication.cs)
/// so validation rules and API shape can evolve independently of storage.
/// </summary>
public class ApplicationCreateRequest
{
    [Required(ErrorMessage = "Name is required.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be 2-100 characters.")]
    public string Name { get; set; } = "";

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Enter a valid email address.")]
    [StringLength(254)]
    public string Email { get; set; } = "";

    [Required(ErrorMessage = "Phone is required.")]
    [StringLength(20, MinimumLength = 7, ErrorMessage = "Enter a valid phone number.")]
    public string Phone { get; set; } = "";

    [StringLength(100)]
    public string? City { get; set; }

    [StringLength(150)]
    public string? Education { get; set; }

    [StringLength(50)]
    public string? Year { get; set; }

    [Required(ErrorMessage = "Role is required.")]
    [StringLength(60)]
    public string Role { get; set; } = "";

    [StringLength(500)]
    public string? Skills { get; set; }

    [StringLength(50)]
    public string? Experience { get; set; }

    [StringLength(300)]
    public string? Portfolio { get; set; }

    [StringLength(50)]
    public string? Hours { get; set; }

    [StringLength(50)]
    public string? Start { get; set; }

    [Required(ErrorMessage = "Please confirm the unpaid internship terms.")]
    [RegularExpression("^(Yes|No)$", ErrorMessage = "UnpaidOk must be 'Yes' or 'No'.")]
    public string UnpaidOk { get; set; } = "";

    [StringLength(2000)]
    public string? Why { get; set; }
}
