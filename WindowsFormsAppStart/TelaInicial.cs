using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace WindowsFormsAppStart
{
    public partial class TelaInicial : Form
    {
        RepositoryBD _repositorio = new RepositoryBD(); 

        public TelaInicial()
        {
            InitializeComponent();
            _repositorio.listaDeClientes = new List<Cliente>();
            AtualizarDados();
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
                    _repositorio.CriarCliente(cadastro.clienteParaCadastrar);
                }
                AtualizarDados();
            }
            catch (Exception)
            {
                throw;
            }
        }
        private void BotaoAtualizarCliente(object sender, EventArgs e)
        {
            if (dataGridVieww.SelectedRows.Count == 0)
            {
                MessageBox.Show("Selecione um cliente para editar.");
                return;
            }
            try
            {
                var idSelecionado = (int)dataGridVieww.SelectedRows[0].Cells[0].Value;
                var clienteSelecioandoPorId = _repositorio.ObterClientePorId(idSelecionado);
                Cadastro cadastro = new Cadastro(clienteSelecioandoPorId);
                cadastro.ShowDialog();
                if ((cadastro.DialogResult == DialogResult.OK))
                {
                    Cliente clienteEditado = _repositorio.ObterClientePorId(cadastro.clienteParaAtualizar.id);
                    _repositorio.AtualizarCliente(cadastro.ObterClienteParaCadastrar());
                    MessageBox.Show("Cliente editado com sucesso!");
                }
                AtualizarDados();
            }
            catch (Exception)
            {
                throw;
            }
        }
        private void BotaonDeletarCliente(object sender, EventArgs e)
        {
            try
            {
                if (dataGridVieww.SelectedRows.Count == 0)
                {
                    MessageBox.Show("Selecione um cliente para deletar.");
                    return;
                }
                var id = (int)dataGridVieww.SelectedRows[0].Cells[0].Value;
                var clienteParaRemover = _repositorio.ObterClientePorId(id);
                int idClienteParaRemover = clienteParaRemover.id;

                DialogResult result = MessageBox.Show("Deseja remover o cliente ? ", "Atenção ", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                if (result == DialogResult.Yes)
                {
                    _repositorio.RemoverCliente(idClienteParaRemover);
                    MessageBox.Show("Cliente removido com sucesso!");
                    AtualizarDados();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public void AtualizarDados()
        {
            dataGridVieww.DataSource = null;
            this.dataGridVieww.DataSource = _repositorio.ObterTodosClientes().Select(x => new {
                        x.id,
                        x.nome,
                        x.dataDeNascimento,
                        x.sexo,
                        x.telefone
                   }).ToList();
            }
    }
}