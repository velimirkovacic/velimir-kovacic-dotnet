using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Backend.Models;

namespace Backend.Services;

public class InstructionService
{
    private readonly IMongoCollection<Instruction> _InstructionCollection;

    public InstructionService(
        IOptions<GetDBSettings> InstructiontoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            InstructiontoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            InstructiontoreDatabaseSettings.Value.DatabaseName);

        _InstructionCollection = mongoDatabase.GetCollection<Instruction>(
            InstructiontoreDatabaseSettings.Value.InstructionCollectionName);
    }

    public async Task<List<Instruction>> GetAsync() =>
        await _InstructionCollection.Find(_ => true).ToListAsync();

    public async Task CreateAsync(Instruction newInstruction) =>
        await _InstructionCollection.InsertOneAsync(newInstruction);
}