using System;
using System.Windows.Forms;

namespace WindowsFormsAppStart
{
    public partial class Cadastro : Form
    {
        public Cliente clienteParaCadastrar = new Cliente();
<<<<<<< HEAD
        public Cliente clienteParaAtualizar ;
=======
        public Cliente clienteParaAtualizar;
>>>>>>> lista_padrão_repository_sem_injecao_dependência
        public Cadastro(Cliente cliente = null)
        {
            InitializeComponent();
            clienteParaAtualizar = cliente;
            if (clienteParaAtualizar != null)
            {
                PreencherCamposCliente(cliente);
            }
        }
        private void BotaoSalvarDadosFormulario(object sender, EventArgs e)
        {
            try
            {
                if (clienteParaAtualizar != null)
                {
                    atualizarCliente(clienteParaAtualizar);
                }
                else
                {
                    cadastrarCliente();
                }
                DialogResult = DialogResult.OK;
            }
            catch (MensagensDeErros ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
        private void botaoAoClicarCancelar(object sender, EventArgs e)
        {
            if (MessageBox.Show("Deseja Cancelar? Você pode perder esses dados", "Atenção", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                this.Close();
            }
        }
        private void PreencherCamposCliente(Cliente cliente)
        {
            txt_Nome.Text = cliente?.nome;
            txtDataNascimento.Text = cliente?.dataNascimento.ToString();
            txt_sexo.Text = cliente?.sexo;
            txt_telefone.Text = cliente?.telefone;
        }
        private Cliente obterDadosFormulario()
        {
            var cliente = new Cliente()
            {
                nome = txt_Nome.Text,
                dataNascimento = Convert.ToDateTime(txtDataNascimento.Text),
                telefone = txt_telefone.Text,
                sexo = txt_sexo.Text
            };
            return cliente;
        }
        private void cadastrarCliente()
        {
            var cliente = obterDadosFormulario();
            ValidarFormulario.validacaoDeCampos(cliente);
            cliente.id = Singleton.ObterProximoId();
<<<<<<< HEAD
            clienteParaCadastrar = cliente; 
=======
            clienteParaCadastrar = cliente;
>>>>>>> lista_padrão_repository_sem_injecao_dependência
        }
        private void atualizarCliente(Cliente clienteASerAtualizado)
        {
            var clienteAtualizado = obterDadosFormulario();
            ValidarFormulario.validacaoDeCampos(clienteAtualizado);
            clienteAtualizado.id = clienteASerAtualizado.id;
<<<<<<< HEAD
            clienteParaCadastrar = clienteAtualizado;    
=======
            clienteParaCadastrar = clienteAtualizado;
>>>>>>> lista_padrão_repository_sem_injecao_dependência
        }
        public Cliente ObterClienteParaCadastrar()
        {
            return clienteParaCadastrar;
        }
    }
}
