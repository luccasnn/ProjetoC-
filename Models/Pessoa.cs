using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PessoasAPI.Models;

public class Pessoa
{
    public int Id { get; set; }

    [Required]
    public string Nome { get; set; } = null!;

    public int Idade { get; set; }

    public List<Endereco> Enderecos { get; set; } = new();
}
