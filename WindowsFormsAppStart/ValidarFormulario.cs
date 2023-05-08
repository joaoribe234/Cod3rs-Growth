using System;

namespace WindowsFormsAppStart
{
    public class ValidarFormulario
    {
        public static void validacaoDeCampos( Cliente cliente ) {

            int dataAtual = DateTime.Now.Year;
            int nascimento = cliente.dataDeNascimento.Year;
            int idade = dataAtual - nascimento;

            string mensagemErro = "";
            
            if (String.IsNullOrWhiteSpace(cliente.nome)) {
                mensagemErro += " O campo nome deve ser preenchido! \n \n";  
            }
            if (String.IsNullOrWhiteSpace(cliente.sexo)) {

                mensagemErro += " O campo Sexo deve ser preenchido! \n \n";  
            }
            if (cliente.telefone.Length < 15) {
                mensagemErro += " O campo Telefone deve ser preenchido! \n \n";
            }
            if (idade > 140) {
                mensagemErro += " A idade não pode ser maior que 140 anos!\n \n";
            }
            if (cliente.dataDeNascimento > DateTime.Now) {
                mensagemErro += " A data de Nascimento não pode ser futura!\n \n";
            }
            if (mensagemErro.Length > 1)
            {
                throw new MensagensDeErros(mensagemErro);
            } 
        }
    }
}
