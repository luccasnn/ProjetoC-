using Microsoft.EntityFrameworkCore;
using PessoasAPI.Data;
using PessoasAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext com SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=pessoas.db"));

// CORS para React
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("ReactPolicy");

app.MapGet("/", () => "API PessoasAPI rodando...");

// Injetar DbContext
app.MapGet("/api/pessoas", async (AppDbContext db) =>
    await db.Pessoas.Include(p => p.Enderecos).ToListAsync());

app.MapGet("/api/pessoas/{id:int}", async (int id, AppDbContext db) =>
{
    var pessoa = await db.Pessoas.Include(p => p.Enderecos).FirstOrDefaultAsync(p => p.Id == id);
    return pessoa is not null ? Results.Ok(pessoa) : Results.NotFound();
});

app.MapPost("/api/pessoas", async (Pessoa novaPessoa, AppDbContext db) =>
{
    db.Pessoas.Add(novaPessoa);
    await db.SaveChangesAsync();
    return Results.Created($"/api/pessoas/{novaPessoa.Id}", novaPessoa);
});

app.MapGet("/api/enderecos/pessoa/{pessoaId:int}", async (int pessoaId, AppDbContext db) =>
{
    var pessoa = await db.Pessoas.Include(p => p.Enderecos).FirstOrDefaultAsync(p => p.Id == pessoaId);
    if (pessoa == null) return Results.NotFound("Pessoa não encontrada");
    return Results.Ok(pessoa.Enderecos);
});

app.MapPost("/api/enderecos", async (Endereco endereco, AppDbContext db) =>
{
    var pessoa = await db.Pessoas.FindAsync(endereco.PessoaId);
    if (pessoa == null) return Results.BadRequest("PessoaId inválido");

    db.Enderecos.Add(endereco);
    await db.SaveChangesAsync();
    return Results.Created($"/api/enderecos/{endereco.Id}", endereco);
});

app.Run();
