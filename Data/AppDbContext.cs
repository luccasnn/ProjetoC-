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
}
