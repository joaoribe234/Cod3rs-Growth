using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsAppStart
{
    class Repositorio
    {
        public List<Cliente> listaDeClientes = Singleton.ObterInstancia();

        public void AdicionarCLiente(Cliente cliente)
        {
            cliente.id = Singleton.ObterProximoId();
            listaDeClientes.Add(cliente);
        }

        public void EditarCliente(Cliente clienteEditado)
        {
            Cliente clienteAtual = PegarPetPeloId(clienteEditado.id);
            int indice = listaDeClientes.IndexOf(clienteAtual);
            listaDeClientes[indice] = clienteEditado;
        }

        public List<Cliente> PegarListaDePets()
        {
            return listaDeClientes;
        }

        public Cliente PegarPetPeloId(int id)
        {
           Cliente cliente = listaDeClientes.FirstOrDefault(i => i.id == id);

            if (cliente == null)
           {
                return null;
           }

           return cliente;
        }

        public void RemoverCliente(Cliente cliente)
        {
            listaDeClientes.Remove(cliente);
        }
    }
}
