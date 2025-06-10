//using System.Collections.Generic;

namespace PessoasAPI.Models;

public class Pessoa
{
    public int Id { get; set; }
    public string Nome { get; set; } = null!;
    public int Idade { get; set; }
    public List<Endereco> Enderecos { get; set; } = new();
}
