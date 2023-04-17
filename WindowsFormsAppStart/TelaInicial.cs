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
        private void buttonCadastrar(object sender, EventArgs e)
        {
            Cadastro cad = new Cadastro();
            cad.ShowDialog();

            cad.cliente.id = ObterProximoId();

            if(cad.DialogResult == DialogResult.OK )
            {
                listaClientes.Add(cad.cliente);
                
            
            }

            AtualizarLista();
        }
        private void buttonEditar(object sender, EventArgs e)
        {

        }

        private void buttonDeletar(object sender, EventArgs e)
        {

        }

        private void dataGridVieww_CellContentClick(object sender, DataGridViewCellEventArgs e)
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
            MessageBox.Show("Cliente adicionado com sucesso!");
            return ++_Id;
            
        }

        private void TelaInicial_Load(object sender, EventArgs e)
        {

        }
    }
}
