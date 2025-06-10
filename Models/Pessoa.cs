using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PessoasAPI.Models;

public class Pessoa
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }

    public int? EnderecoId { get; set; }
    public Endereco? Endereco { get; set; }
}