using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Backend.Models;
using System;

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

    public async Task<List<Instruction>> GetPastByIdProf(string id)
    {
        DateTime dt = DateTime.UtcNow;
        return await _InstructionCollection.Find(x => x.professorId == id  && x.dateTime < dt).ToListAsync();
    }
    public async Task<List<Instruction>> GetFutureByIdProf(string id)
    {
        DateTime dt = DateTime.UtcNow;
        return await _InstructionCollection.Find(x => x.professorId == id && x.dateTime > dt).ToListAsync();
    }
    public async Task<List<Instruction>> GetPastByIdStudent(string id)
    {
        DateTime dt = DateTime.UtcNow;
        return await _InstructionCollection.Find(x =>  x.studentId == id && x.dateTime < dt).ToListAsync();
    }
    public async Task<List<Instruction>> GetFutureByIdStudent(string id)
    {
        DateTime dt = DateTime.UtcNow;
        return await _InstructionCollection.Find(x =>  x.studentId == id && x.dateTime > dt).ToListAsync();
    }
}