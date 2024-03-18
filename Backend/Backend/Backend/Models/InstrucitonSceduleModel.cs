using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Backend.Models
{
    public class InstructionSceduleModel
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ProfessorId { get; set; }
    }
}
