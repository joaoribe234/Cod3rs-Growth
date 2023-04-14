using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsAppStart
{
    public partial class Cadastro : Form
    {
        private List<Cliente> ListaCliente;
        Cliente cliente = new Cliente();    
        public Cadastro()
        {
            InitializeComponent();
            //ListaCliente = listaCliente;
        }

        private void labelNome(object sender, EventArgs e)
        {

        }

        private void Cadastro_Load(object sender, EventArgs e)
        {

        }

        private void ButtonSalvar(object sender, EventArgs e)
        {
            cliente.nome = txt_Nome.Text;
            //cliente.dataNascimento = txtDataNascimento.Text;
            cliente.sexo = txt_sexo.Text;   
            cliente.telefone = txt_telefone.Text;

            DialogResult = DialogResult.OK;
        }

        private void ButtonCancelar(object sender, EventArgs e)
        {

        }

        private void labelDataNascimento(object sender, EventArgs e)
        {

        }

        private void labelTelefone(object sender, EventArgs e)
        {

        }

        private void labelSexo(object sender, EventArgs e)
        {

        }

        private void textBoxNome(object sender, EventArgs e)
        {

        }

        private void textBoxTelefone(object sender, EventArgs e)
        {

        }
        private void dateTimePickerDataNascimento(object sender, EventArgs e)
        {
        }

        private void comboBox1_Sexo(object sender, EventArgs e)
        {

        }
    }
}
