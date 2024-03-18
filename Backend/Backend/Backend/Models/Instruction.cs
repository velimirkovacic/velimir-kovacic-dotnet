using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Instruction
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string studentId { get; set; }
        [Required]
        [BsonRepresentation(BsonType.ObjectId)]
        public string professorId { get; set; }
        [Required]
        public DateTime dateTime { get; set; }
        public string status { get; set; }

    }
}
