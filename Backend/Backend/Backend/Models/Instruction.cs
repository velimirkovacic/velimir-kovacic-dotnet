using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Backend.Models
{
    public class Instruction
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string? studentId { get; set; }
        [Required]
        [BsonRepresentation(BsonType.ObjectId)]
        public string professorId { get; set; }
        [Required]
        public DateTime dateTime { get; set; }
        public string? status { get; set; }

    }
}
