using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class EmailRequestModel
    {
        [Required]
        public string Email { get; set; }
    }
}
