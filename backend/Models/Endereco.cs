using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PessoasAPI.Models;

public class Endereco
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Rua é obrigatória")]
    [MinLength(1, ErrorMessage = "Rua não pode estar em branco")]
    public string Rua { get; set; }

    [Required(ErrorMessage = "Cidade é obrigatória")]
    public string Cidade { get; set; }

    [Required(ErrorMessage = "Estado é obrigatório")]
    public string Estado { get; set; }

    public int? PessoaId { get; set; }
    public Pessoa? Pessoa { get; set; }
}
