using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.TextBox;

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
        private void botaoEditarCliente(object sender, EventArgs e )
        {   
            if (dataGridVieww.SelectedRows.Count == 0)
            {
                MessageBox.Show("Selecione um cliente para editar.");
                return;
            }         
            var idSelecionado= (int)dataGridVieww.SelectedRows[0].Cells[0].Value;

            var clienteSelecioandoPorId = listaClientes.Find(x => x.id == idSelecionado);

            Cadastro cadastro = new Cadastro(clienteSelecioandoPorId);
            cadastro.ShowDialog();

            if ((cadastro.DialogResult == DialogResult.OK))
            {
                MessageBox.Show("Cliente editado com sucesso!");
                
            }

            AtualizarLista();
        }

        private void botaonDeletarCliente(object sender, EventArgs e)
        {
            if (dataGridVieww.SelectedRows.Count == 0)
            {
                MessageBox.Show("Selecione um cliente para deletar.");
                return;
            }
            var id = (int)dataGridVieww.SelectedRows[0].Cells[0].Value;
            var clienteParaRemover = listaClientes.Find(x => x.id == id);
            listaClientes.Remove(clienteParaRemover);
              MessageBox.Show("Cliente removido com sucesso!");

            AtualizarLista();
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