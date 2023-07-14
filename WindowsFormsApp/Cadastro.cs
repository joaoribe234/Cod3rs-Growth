using Dominio.Entidades;
using Dominio.Mensagens;
using Dominio.Servico;

namespace WindowsFormsAppStart
{
    public partial class Cadastro : Form
    {
        public Clientes clienteParaCadastrar = new Clientes();
        public Clientes clienteParaAtualizar;
        public Cadastro(Clientes cliente = null)
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
        private void PreencherCamposCliente(Clientes cliente)
        {
            txt_Nome.Text = cliente?.Nome;
            txtDataNascimento.Text = cliente?.DataDeNascimento.ToString();
            txt_sexo.Text = cliente?.Sexo;
            txt_telefone.Text = cliente?.Telefone;
        }
        private Clientes obterDadosFormulario()
        {
            var cliente = new Clientes()
            {
                Nome = txt_Nome.Text,
                DataDeNascimento = Convert.ToDateTime(txtDataNascimento.Text),
                Telefone = txt_telefone.Text,
                Sexo = txt_sexo.Text
            };
            return cliente;
        }
        private void cadastrarCliente()
        {
            var cliente = obterDadosFormulario();
            ValidarFormulario.validacaoDeCampos(cliente);
            cliente.Id = Singleton.ObterProximoId();
            clienteParaCadastrar = cliente;
        }
        private void atualizarCliente(Clientes clienteASerAtualizado)
        {
            var clienteAtualizado = obterDadosFormulario();
            ValidarFormulario.validacaoDeCampos(clienteAtualizado);
            clienteAtualizado.Id = clienteASerAtualizado.Id;
            clienteParaCadastrar = clienteAtualizado;
        }
        public Clientes ObterClienteParaCadastrar()
        {
            return clienteParaCadastrar;
        }
    }
}
