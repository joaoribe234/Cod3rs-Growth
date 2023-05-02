using System.Collections.Generic;

namespace WindowsFormsAppStart
{
    interface IRepository
    {
        interface IRepository
        {
            public List<Cliente> PegarListaDeClientes();
            public Cliente PegarClientePeloId(int id);
            public void CriarCliente(Cliente cliente);
            public void RemoverPCliente(Cliente cliente);
            public void EditarCliente(Cliente clienteEditado);
        }
    }
}
