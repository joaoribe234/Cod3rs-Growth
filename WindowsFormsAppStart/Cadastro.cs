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
            if ((String.IsNullOrWhiteSpace(txt_Nome.Text)))
            {
                MessageBox.Show(" O campo nome deve ser preenchido!");
                txt_Nome.BackColor = Color.LightGreen;
            }
            else if (String.IsNullOrWhiteSpace(txt_sexo.Text))
            { MessageBox.Show("O campo sexo deve ser preenchido!");
                txt_sexo.BackColor = Color.LightGreen;
            }
            else if (!txt_telefone.MaskCompleted) {
                MessageBox.Show("O telefone deve ser válido!");
                txt_telefone.BackColor = Color.LightGreen;
            }
            else
            {
                cliente.nome = txt_Nome.Text;
                cliente.dataNascimento = Convert.ToDateTime(txtDataNascimento.Text);
                cliente.sexo = txt_sexo.Text;
                cliente.telefone = txt_telefone.Text;
                DialogResult = DialogResult.OK;
            }
        }

        private void botaoAoClicarCancelarRetornaTelaInicial(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
