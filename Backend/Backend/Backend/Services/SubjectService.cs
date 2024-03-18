using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Backend.Models;

namespace Backend.Services;

public class SubjectService
{
    private readonly IMongoCollection<Subject> _SubjectCollection;

    public SubjectService(
        IOptions<GetDBSettings> SubjecttoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            SubjecttoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            SubjecttoreDatabaseSettings.Value.DatabaseName);

        _SubjectCollection = mongoDatabase.GetCollection<Subject>(
            SubjecttoreDatabaseSettings.Value.SubjectCollectionName);
    }

    public async Task<List<Subject>> GetAsync() =>
        await _SubjectCollection.Find(_ => true).ToListAsync();

    public async Task<List<Subject>> GetAsync(string url) =>
    await _SubjectCollection.Find(x => x.Url == url).ToListAsync();

    public async Task<long> CountAsyncUrl(string url) =>
await _SubjectCollection.Find(x => x.Url == url).CountDocumentsAsync();
    public async Task<long> CountAsyncTitle(string title) =>
await _SubjectCollection.Find(x => x.Title == title).CountDocumentsAsync();
    public async Task CreateAsync(Subject newSubject) =>
        await _SubjectCollection.InsertOneAsync(newSubject);

    public async Task UpdateAsync(string id, Subject updatedSubject) =>
        await _SubjectCollection.ReplaceOneAsync(x => x.Id == id, updatedSubject);

    public async Task RemoveAsync(string id) =>
        await _SubjectCollection.DeleteOneAsync(x => x.Id == id);
}

