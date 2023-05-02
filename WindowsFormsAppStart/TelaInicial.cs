using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Windows.Forms;

namespace WindowsFormsAppStart
{
    public partial class TelaInicial : Form
    {
        public List<Cliente> listaClientes = Singleton.ObterInstancia();

        public TelaInicial()
        {
            InitializeComponent();
            listaClientes = new List<Cliente>();
            AtualizarLista();
        }
        private void botaoCadastrarCliente(object sender, EventArgs e)
        {
            try
            {
                Cadastro cadastro = new Cadastro();
                cadastro.ShowDialog();

                if (cadastro.DialogResult == DialogResult.OK)
                {
                    MessageBox.Show("Cliente adicionado com sucesso!");
                    listaClientes.Add(cadastro.clienteParaCadastrar);
                }
                AtualizarLista();
            }
            catch (Exception) {
                throw;
            }
        }
        private void botaoEditarCliente(object sender, EventArgs e )
        {
                if (dataGridVieww.SelectedRows.Count == 0)
            {
                MessageBox.Show("Selecione um cliente para editar.");
                return;
            }
            try
            {
                var idSelecionado = (int)dataGridVieww.SelectedRows[0].Cells[0].Value;
                var clienteSelecioandoPorId = listaClientes.Find(x => x.id == idSelecionado);

                Cadastro cadastro = new Cadastro(clienteSelecioandoPorId);
                cadastro.ShowDialog();
                if ((cadastro.DialogResult == DialogResult.OK))
                {
                    Cliente clienteEditado = listaClientes.Find(x => x.id == cadastro.clienteParaAtualizar.id);
                    listaClientes[listaClientes.IndexOf(clienteEditado)] = cadastro.ObterClienteParaCadastrar();
                    MessageBox.Show("Cliente editado com sucesso!");
                }
                AtualizarLista();
            }
            catch (Exception) {
                throw;
            }
        }
        private void botaonDeletarCliente(object sender, EventArgs e)
        {
            try
            {
                if (dataGridVieww.SelectedRows.Count == 0)
                {
                    MessageBox.Show("Selecione um cliente para deletar.");
                    return;
                }
                var id = (int)dataGridVieww.SelectedRows[0].Cells[0].Value;
                var clienteParaRemover = listaClientes.Find(x => x.id == id);

                DialogResult result = MessageBox.Show("Deseja remover o cliente ? ", "Atenção ", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                if (result == DialogResult.Yes)
                {
                    listaClientes.Remove(clienteParaRemover);
                    MessageBox.Show("Cliente removido com sucesso!");
                    AtualizarLista();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public void AtualizarLista()
        {
            this.dataGridVieww.DataSource = listaClientes.Select(x => new {
            x.id  ,
            x.nome,
            x.dataNascimento,
            x.sexo,
            x.telefone
            }).ToList();
        }
    }
}