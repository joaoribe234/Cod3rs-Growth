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
    public partial class TelaInicial : Form
    {
        public TelaInicial()
        {
            InitializeComponent();
            var listaClientes = new List<Cliente>();
            listaClientes.AddRange(new[]
            {
                new Cliente(1, "joao vitor",DateTime.Now,"masculino","5435453453"),
                new Cliente(2, "joao pedro",DateTime.Now,"masculino","5435773453"),
            });

            this.dataGridViewList.DataSource = listaClientes;
        }

        private void listBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void buttonCadastrar(object sender, EventArgs e)
        {
            Cadastro cad = new Cadastro();
            cad.ShowDialog();
        }

        private void label12_Click(object sender, EventArgs e)
        {

        }

        private void buttonEditar(object sender, EventArgs e)
        {

        }

        private void buttonDeletar(object sender, EventArgs e)
        {

        }

        private void dataGridView2_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void dataGridViewList_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }
    }
}
