using Dominio.Entidades;

namespace Dominio.Interface
{
    public interface IRepositorio
    {
        List<Clientes> ObterTodosClientes();
        Clientes ObterClientePorId(int id);
        int CriarCliente(Clientes cliente);
        void AtualizarCliente(Clientes clienteEditado);
        void RemoverCliente(int id);
    }
}
