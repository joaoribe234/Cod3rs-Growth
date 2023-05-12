using Microsoft.Data.SqlClient;

namespace WindowsFormsAppStart
{
    class ConversaoDeDados
    {
        public List<Cliente> ConversaoClientes(SqlDataReader leitor)
        {
           List<Cliente> clientes = new List<Cliente>();
            while (leitor.Read())
            {
                Cliente cliente = new Cliente()
                {
                    id = (int)leitor.GetInt64(0),
                    nome = leitor.GetString(1),
                    dataDeNascimento = leitor.GetDateTime(2),
                    sexo = leitor.GetString(3),
                    telefone = leitor.GetString(4)
                };
                clientes.Add(cliente);
            }
            return clientes;
        }
        public Cliente ConversaoClientePorID(SqlDataReader leitor) {
            if (leitor.Read())
            {
                Cliente cliente = new Cliente()
                {
                    id = (int)leitor.GetInt64(0),
                    nome = leitor.GetString(1),
                    dataDeNascimento = leitor.GetDateTime(2),
                    sexo = leitor.GetString(3),
                    telefone = leitor.GetString(4)
                };
                return cliente;
            }
            else
            {
                return null;
            }
        }
    }
}

