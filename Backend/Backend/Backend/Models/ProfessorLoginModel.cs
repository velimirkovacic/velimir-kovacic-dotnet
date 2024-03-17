﻿using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class ProfessorLoginModel
    {

            [Required]
            public string Email { get; set; }
            [Required]
            public string Password { get; set; }
    }
}
