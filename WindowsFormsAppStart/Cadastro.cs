using System;
using System.Windows.Forms;

namespace WindowsFormsAppStart
{
    public partial class Cadastro : Form
    {
        public Cliente cliente = new Cliente();
        private Cliente _clienteAtual ;
        public Cadastro(Cliente cliente = null)
        {
            InitializeComponent();
            _clienteAtual = cliente;
          //  if (_clienteAtual != null)
          //  {
              //  carregarDados();   
         //   }
        }
        private void BotaoSalvarDadosFormulario(object sender, EventArgs e)
        {
            try
            {
                if (_clienteAtual != null)
                {
                    carregarDados();
                    editarCliente();
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
            this.Close();
        }
        void carregarDados()
        {
            txt_Nome.Text = _clienteAtual.nome;
            txtDataNascimento.Text = _clienteAtual.dataNascimento.ToString();
            txt_sexo.Text = _clienteAtual.sexo;
            txt_telefone.Text = _clienteAtual.telefone;
        }
        void cadastrarCliente()
        {
            cliente.nome = txt_Nome.Text;
            cliente.dataNascimento = Convert.ToDateTime(txtDataNascimento.Text);
            cliente.sexo = txt_sexo.Text;
            cliente.telefone = txt_telefone.Text;
            ValidarFormulario.validacaoDeCampos(cliente);
        }
        void editarCliente()
        {
            _clienteAtual.nome = txt_Nome.Text;
            _clienteAtual.dataNascimento = Convert.ToDateTime(txtDataNascimento.Text);
            _clienteAtual.sexo = txt_sexo.Text;
            _clienteAtual.telefone = txt_telefone.Text;
            ValidarFormulario.validacaoDeCampos(_clienteAtual);
        }
        
    }
}