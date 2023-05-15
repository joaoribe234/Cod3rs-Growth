namespace WindowsFormsAppStart
{
    public class Repositorio : IRepositorio
    {
        public List<Clientes> listaDeClientes = Singleton.ObterInstancia();

        public List<Clientes> ObterTodosClientes()
        {
            return listaDeClientes;
        }
        public Clientes ObterClientePorId(int id)
        {
            Clientes cliente = listaDeClientes.FirstOrDefault(i => i.Id == id);

            if (cliente == null)
            {
                return null;
            }
            return cliente;
        }
        public void CriarCliente(Clientes cliente)
        {
            listaDeClientes.Add(cliente);
        }
        public void AtualizarCliente(Clientes clienteEditado)
        {
            Clientes clienteAtual = ObterClientePorId(clienteEditado.Id);
            int indice = listaDeClientes.IndexOf(clienteAtual);
            listaDeClientes[indice] = clienteEditado;
        }
        public void RemoverCliente(int id)
        {
            Clientes cliente = ObterClientePorId(id);
            listaDeClientes.Remove(cliente);
        }
    }
}
