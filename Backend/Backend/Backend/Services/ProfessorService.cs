using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Backend.Models;

namespace Backend.Services;

public class ProfessorService
{
    private readonly IMongoCollection<Professor> _ProfessorCollection;

    public ProfessorService(
        IOptions<GetDBSettings> ProfessortoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            ProfessortoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            ProfessortoreDatabaseSettings.Value.DatabaseName);

        _ProfessorCollection = mongoDatabase.GetCollection<Professor>(
            ProfessortoreDatabaseSettings.Value.ProfessorCollectionName);
    }

    public async Task<List<Professor>> GetAsync() =>
        await _ProfessorCollection.Find(_ => true).ToListAsync();

    public async Task<Professor?> GetAsync(string email, string password) =>
        await _ProfessorCollection.Find(x => x.Email == email  && x.Password == password).FirstOrDefaultAsync();
    public async Task<Professor?> GetAsync(string email) =>
        await _ProfessorCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
    public async Task<Professor?> GetAsyncId(string Id) =>
    await _ProfessorCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();

    public async Task<List<Professor>> GetAsyncBySubject(string Id) =>
         _ProfessorCollection.Find(x => x.Subjects.Contains(Id)).ToList();

    public async Task CreateAsync(Professor newProfessor) =>
        await _ProfessorCollection.InsertOneAsync(newProfessor);

    public async Task UpdateAsync(string id, Professor updatedProfessor) =>
        await _ProfessorCollection.ReplaceOneAsync(x => x.Id == id, updatedProfessor);

    public async Task RemoveAsync(string id) =>
        await _ProfessorCollection.DeleteOneAsync(x => x.Id == id);
}

