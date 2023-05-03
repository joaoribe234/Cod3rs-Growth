using System.Collections.Generic;

namespace WindowsFormsAppStart
{
    public interface IRepository
    {
        List<Cliente> ObterTodosClientes();
        Cliente ObterClientePorId(int id);
        void CriarCliente(Cliente cliente);
        void AtualizarCliente(Cliente clienteEditado);
        void RemoverCliente(Cliente cliente);
    }
}
