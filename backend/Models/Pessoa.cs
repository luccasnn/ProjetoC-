using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PessoasAPI.Models;

public class Pessoa
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres.")]
    public string Nome { get; set; } = string.Empty;
    
    [Range(0, 130, ErrorMessage = "A idade deve estar entre 0 e 130.")]
    public int Idade { get; set; }

    public int? EnderecoId { get; set; }
    public Endereco? Endereco { get; set; }
}