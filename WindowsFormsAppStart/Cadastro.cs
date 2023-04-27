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
            if (_clienteAtual != null)
            {
                PreencherCamposCliente();   
            }
        }
        private void BotaoSalvarDadosFormulario(object sender, EventArgs e)
        {
            try
            {    
                SalvarCliente();
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
        void PreencherCamposCliente()
        {
            txt_Nome.Text = _clienteAtual.nome;
            txtDataNascimento.Text = _clienteAtual.dataNascimento.ToString();
            txt_sexo.Text = _clienteAtual.sexo;
            txt_telefone.Text = _clienteAtual.telefone;
        }
        void SalvarCliente()
        {
            Cliente clienteASalvar = (_clienteAtual != null) ? _clienteAtual : cliente;
            ValidarFormulario.validacaoDeCampos(clienteASalvar);
            clienteASalvar.nome = txt_Nome.Text;
            clienteASalvar.dataNascimento = Convert.ToDateTime(txtDataNascimento.Text);
            clienteASalvar.sexo = txt_sexo.Text;
            clienteASalvar.telefone = txt_telefone.Text;
            
        }      
    }
}
