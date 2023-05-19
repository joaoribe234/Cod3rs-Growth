using Dominio.Entidades;
using Dominio.Mensagens;

namespace Dominio.Servico
{
    public class ValidarFormulario
    {
        public static void validacaoDeCampos(Clientes cliente)
        {

            int dataAtual = DateTime.Now.Year;
            int nascimento = cliente.DataDeNascimento.Year;
            int idade = dataAtual - nascimento;

            string mensagemErro = "";

            if (string.IsNullOrWhiteSpace(cliente.Nome))
            {
                mensagemErro += " O campo nome deve ser preenchido! \n \n";
            }
            if (string.IsNullOrWhiteSpace(cliente.Sexo))
            {

                mensagemErro += " O campo Sexo deve ser preenchido! \n \n";
            }
            if (cliente.Telefone.Length < 15)
            {
                mensagemErro += " O campo Telefone deve ser preenchido! \n \n";
            }
            if (idade > 140)
            {
                mensagemErro += " A idade não pode ser maior que 140 anos!\n \n";
            }
            if (cliente.DataDeNascimento > DateTime.Now)
            {
                mensagemErro += " A data de Nascimento não pode ser futura!\n \n";
            }
            if (mensagemErro.Length > 1)
            {
                throw new MensagensDeErros(mensagemErro);
            }
        }
    }
}
