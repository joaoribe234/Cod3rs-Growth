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
            
            if ((!String.IsNullOrWhiteSpace(txt_Nome.Text) && !String.IsNullOrWhiteSpace(txt_sexo.Text))  && (!String.IsNullOrWhiteSpace(txt_telefone.Text) && !String.IsNullOrWhiteSpace(txtDataNascimento.Text)))
            {
                cliente.nome = txt_Nome.Text;
                cliente.dataNascimento = Convert.ToDateTime(txtDataNascimento.Text);
                cliente.sexo = txt_sexo.Text;
                cliente.telefone = txt_telefone.Text;
                DialogResult = DialogResult.OK;
            }
            else {
                MessageBox.Show("Não pode haver valores nulos ao cadastrar cliente!");
            }    
        }

        private void botaoAoClicarCancelarRetornaTelaInicial(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
