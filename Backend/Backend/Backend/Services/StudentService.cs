using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Backend.Models;

namespace Backend.Services;

public class StudentService
{
    private readonly IMongoCollection<Student> _StudentCollection;

    public StudentService(
        IOptions<GetDBSettings> StudenttoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            StudenttoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            StudenttoreDatabaseSettings.Value.DatabaseName);

        _StudentCollection = mongoDatabase.GetCollection<Student>(
            StudenttoreDatabaseSettings.Value.StudentCollectionName);
    }

    public async Task<List<Student>> GetAsync() =>
        await _StudentCollection.Find(_ => true).ToListAsync();

    public async Task<Student?> GetAsync(string email, string password) =>
        await _StudentCollection.Find(x => x.Email == email  && x.Password == password).FirstOrDefaultAsync();
    public async Task<Student?> GetAsync(string email) =>
        await _StudentCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
    public async Task<Student?> GetAsyncId(string Id) =>
    await _StudentCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
    public async Task CreateAsync(Student newStudent) =>
        await _StudentCollection.InsertOneAsync(newStudent);

    public async Task UpdateAsync(string id, Student updatedStudent) =>
        await _StudentCollection.ReplaceOneAsync(x => x.Id == id, updatedStudent);

    public async Task RemoveAsync(string id) =>
        await _StudentCollection.DeleteOneAsync(x => x.Id == id);
}

