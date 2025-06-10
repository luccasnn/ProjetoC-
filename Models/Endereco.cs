using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PessoasAPI.Models;

public class Endereco
{
    public int Id { get; set; }
    public string Rua { get; set; } = string.Empty;
    public string Cidade { get; set; } = string.Empty;
    public string Estado { get; set; } = string.Empty;

    public int? PessoaId { get; set; }
    public Pessoa? Pessoa { get; set; }
}
