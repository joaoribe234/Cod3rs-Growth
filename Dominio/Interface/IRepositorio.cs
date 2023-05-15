namespace WindowsFormsAppStart
{
    public interface IRepositorio
    {
        List<Clientes> ObterTodosClientes();
        Clientes ObterClientePorId(int id);
        void CriarCliente(Clientes cliente);
        void AtualizarCliente(Clientes clienteEditado);
        void RemoverCliente(int id);
    }
}
