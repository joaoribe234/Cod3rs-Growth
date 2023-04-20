using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsAppStart
{
    public partial class TelaInicial : Form
    {
        public List<Cliente> listaClientes = new List<Cliente>();
        public int _Id;
        public TelaInicial()
        {
            InitializeComponent();
            listaClientes = new List<Cliente>();
            AtualizarLista();
        }
        private void botaoCadastrarCliente(object sender, EventArgs e)
        {
            Cadastro cadastro = new Cadastro();
            cadastro.ShowDialog();

            if((cadastro.DialogResult == DialogResult.OK ))
            {
                MessageBox.Show("Cliente adicionado com sucesso!");
                cadastro.cliente.id = ObterProximoId();
                listaClientes.Add(cadastro.cliente);
            }

            AtualizarLista();
        }
        private void botaoEditarCliente(object sender, EventArgs e)
        {

        }

        private void botaonDeletarCliente(object sender, EventArgs e)
        {

        }

        private void AtualizarLista()
        {
            this.dataGridVieww.DataSource = listaClientes.Select(x => new {
            x.id  ,
            x.nome,
            x.dataNascimento,
            x.sexo,
            x.telefone
            }).ToList();
        }

        private int ObterProximoId()
        {   
            return ++_Id;
        }

    }
}