using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PessoasAPI.Models;

public class Endereco
{
    public int Id { get; set; }

    [Required]
    public string Rua { get; set; } = null!;

    [Required]
    public string Cidade { get; set; } = null!;

    [Required]
    public string Estado { get; set; } = null!;

    // FK
    [ForeignKey("Pessoa")]
    public int PessoaId { get; set; }
    public Pessoa? Pessoa { get; set; }
}
