﻿namespace WindowsFormsAppStart
{
    class Repositorio : IRepositorio
    {
        public List<Cliente> listaDeClientes = Singleton.ObterInstancia();

        public List<Cliente> ObterTodosClientes()
        {
            return listaDeClientes;
        }
        public Cliente ObterClientePorId(int id)
        {
            Cliente cliente = listaDeClientes.FirstOrDefault(i => i.id == id);

            if (cliente == null)
            {
                return null;
            }
            return cliente;
        }
        public void CriarCliente(Cliente cliente)
        {
            listaDeClientes.Add(cliente);
        }
        public void AtualizarCliente(Cliente clienteEditado)
        {
            Cliente clienteAtual = ObterClientePorId(clienteEditado.id);
            int indice = listaDeClientes.IndexOf(clienteAtual);
            listaDeClientes[indice] = clienteEditado;
        }
        public void RemoverCliente(int id)
        {
            Cliente cliente = ObterClientePorId(id);
            listaDeClientes.Remove(cliente);
        }
    }
}