using Microsoft.EntityFrameworkCore;
using PessoasAPI.Models;

namespace PessoasAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Pessoa> Pessoas { get; set; } = null!;
    public DbSet<Endereco> Enderecos { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Relacionamento 1:1 entre Pessoa e Endereco
        modelBuilder.Entity<Pessoa>()
            .HasOne(p => p.Endereco)
            .WithOne(e => e.Pessoa)
            .HasForeignKey<Endereco>(e => e.PessoaId);
    }
}
