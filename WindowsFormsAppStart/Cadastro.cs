using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsAppStart
{
    public partial class Cadastro : Form
    {

        
        public Cliente cliente = new Cliente();
        
        
        public Cadastro()
        {
            InitializeComponent();
        }
        
        private void BotaoSalvarDadosFormulario(object sender, EventArgs e)

        {
            
                cliente.nome = txt_Nome.Text;
                cliente.dataNascimento = Convert.ToDateTime(txtDataNascimento.Text);
                cliente.sexo = txt_sexo.Text;
                cliente.telefone = txt_telefone.Text;
                
                try
                {
                 
                 ValidarFormulario.validacaoDeCampos(cliente);
                DialogResult = DialogResult.OK;

            }
                catch (MensagensDeErros ex)
                {
                 
                MessageBox.Show(ex.Message);
                
            }
                
                
            
        }

        private void botaoAoClicarCancelarRetornaTelaInicial(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
