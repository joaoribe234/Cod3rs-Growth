using System;
using System.Windows.Forms;

namespace WindowsFormsAppStart
{
    public partial class Cadastro : Form
    {
        public Cliente clienteParaCadastrar = new Cliente();
        public Cliente clienteParaAtualizar ;
        public Cadastro(Cliente cliente = null)
        {
            InitializeComponent();
            clienteParaAtualizar = cliente;
            if (clienteParaAtualizar != null){
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
        private Cliente obterDadosFormulario() {
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
            clienteParaCadastrar = cliente; 
        }
        private void atualizarCliente(Cliente clienteASerAtualizado)
        {
            var clienteAtualizado = obterDadosFormulario();
            ValidarFormulario.validacaoDeCampos(clienteAtualizado);
            clienteAtualizado.id = clienteASerAtualizado.id;
            clienteParaCadastrar = clienteAtualizado;    
        }
        public Cliente ObterClienteParaCadastrar()
        {
            return clienteParaCadastrar;
        }
    }
}
