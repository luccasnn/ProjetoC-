using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using PessoasAPI.Models;
using PessoasAPI.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=banco.db"));
builder.Services.AddCors();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});


var app = builder.Build();
app.UseCors(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.MapGet("/api/pessoas", ([FromServices] AppDbContext db) =>
{
    var pessoas = db.Pessoas
        .Include(p => p.Endereco)
        .Select(p => new
        {
            p.Id,
            p.Nome,
            p.Idade,
            Endereco = p.Endereco != null ? new
            {
                p.Endereco.Id,
                p.Endereco.Rua,
                p.Endereco.Cidade,
                p.Endereco.Estado
            } : null
        })
        .ToList();

    return Results.Ok(pessoas);
});
app.MapGet("/api/pessoas/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    var pessoa = ctx.Pessoas.Include(p => p.Endereco).FirstOrDefault(p => p.Id == id);
    return pessoa is null ? Results.NotFound() : Results.Ok(pessoa);
});

app.MapPost("/api/pessoas", async ([FromBody] Pessoa pessoa, [FromServices] AppDbContext ctx) =>
{
    var endereco = await ctx.Enderecos.FindAsync(pessoa.EnderecoId);
    if (endereco == null)
    {
        return Results.BadRequest("Endereço não encontrado.");
    }

    pessoa.Endereco = endereco;
    endereco.Pessoa = pessoa;

    ctx.Pessoas.Add(pessoa);
    await ctx.SaveChangesAsync();

    return Results.Created($"/pessoas/{pessoa.Id}", pessoa);
});

app.MapPut("/api/pessoas/{id}", ([FromRoute] int id, [FromBody] Pessoa pessoaAtualizada, [FromServices] AppDbContext ctx) =>
{
    var pessoa = ctx.Pessoas.Find(id);
    if (pessoa is null) return Results.NotFound();

    pessoa.Nome = pessoaAtualizada.Nome;
    pessoa.Idade = pessoaAtualizada.Idade;
    pessoa.EnderecoId = pessoaAtualizada.EnderecoId;

    ctx.Pessoas.Update(pessoa);
    ctx.SaveChanges();
    return Results.Ok(pessoa);
});

app.MapDelete("/api/pessoas/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    var pessoa = ctx.Pessoas.Find(id);
    if (pessoa is null) return Results.NotFound();

    ctx.Pessoas.Remove(pessoa);
    ctx.SaveChanges();
    return Results.Ok(pessoa);
});

app.MapGet("/api/enderecos", ([FromServices] AppDbContext ctx) =>
{
    return ctx.Enderecos.Any() ? Results.Ok(ctx.Enderecos.ToList()) : Results.NotFound();
});

app.MapGet("/api/enderecos/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    var endereco = ctx.Enderecos.Find(id);
    return endereco is null ? Results.NotFound() : Results.Ok(endereco);
});

app.MapPost("/api/enderecos", ([FromBody] Endereco endereco, [FromServices] AppDbContext ctx) =>
{
    endereco.PessoaId = null; // inicializa como null
    ctx.Enderecos.Add(endereco);
    ctx.SaveChanges();
    return Results.Created($"/api/enderecos/{endereco.Id}", endereco);
});

app.MapPut("/api/enderecos/{id}", ([FromRoute] int id, [FromBody] Endereco enderecoAtualizado, [FromServices] AppDbContext ctx) =>
{
    var endereco = ctx.Enderecos.Find(id);
    if (endereco is null) return Results.NotFound();

    endereco.Rua = enderecoAtualizado.Rua;
    endereco.Cidade = enderecoAtualizado.Cidade;
    endereco.PessoaId = enderecoAtualizado.PessoaId;

    ctx.Enderecos.Update(endereco);
    ctx.SaveChanges();
    return Results.Ok(endereco);
});

app.MapDelete("/api/enderecos/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    var endereco = ctx.Enderecos.Find(id);
    if (endereco is null) return Results.NotFound();

    ctx.Enderecos.Remove(endereco);
    ctx.SaveChanges();
    return Results.Ok(endereco);
});

app.Run();