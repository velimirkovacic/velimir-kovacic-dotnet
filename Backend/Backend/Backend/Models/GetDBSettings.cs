namespace Backend.Models
{
    public class GetDBSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;

        public string StudentCollectionName { get; set; } = null!;
        public string ProfessorCollectionName { get; set; } = null!;
    }
}
