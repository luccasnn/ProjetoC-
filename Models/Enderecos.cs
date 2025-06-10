using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
    [JsonIgnore]
    public Pessoa? Pessoa { get; set; }
}
