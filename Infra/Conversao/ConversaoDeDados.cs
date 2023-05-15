using Microsoft.Data.SqlClient;

namespace WindowsFormsAppStart
{
    class ConversaoDeDados
    {
        public List<Clientes> ConversaoClientes(SqlDataReader leitor)
        {
           List<Clientes> clientes = new List<Clientes>();
            while (leitor.Read())
            {
                Clientes cliente = new Clientes()
                {
                    Id = (int)leitor.GetInt64(0),
                    Nome = leitor.GetString(1),
                    DataDeNascimento = leitor.GetDateTime(2),
                    Sexo = leitor.GetString(3),
                    Telefone = leitor.GetString(4)
                };
                clientes.Add(cliente);
            }
            return clientes;
        }
        public Clientes ConversaoClientePorID(SqlDataReader leitor) {
            if (leitor.Read())
            {
                Clientes cliente = new Clientes()
                {
                    Id = (int)leitor.GetInt64(0),
                    Nome = leitor.GetString(1),
                    DataDeNascimento = leitor.GetDateTime(2),
                    Sexo = leitor.GetString(3),
                    Telefone = leitor.GetString(4)
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

