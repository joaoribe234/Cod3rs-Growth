namespace WindowsFormsAppStart
{
    public interface IRepositorio
    {
        List<Cliente> ObterTodosClientes();
        Cliente ObterClientePorId(int id);
        void CriarCliente(Cliente cliente);
        void AtualizarCliente(Cliente clienteEditado);
        void RemoverCliente(int id);
    }
}
