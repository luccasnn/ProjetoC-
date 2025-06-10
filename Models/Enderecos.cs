namespace PessoasAPI.Models;

public class Endereco
{
    public int Id { get; set; }
    public string Rua { get; set; } = null!;
    public string Cidade { get; set; } = null!;
    public string Estado { get; set; } = null!;
    public int PessoaId { get; set; }
}
