using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Configuration;


namespace WindowsFormsAppStart
{
     class RepositoryBD : IRepository
     {
        public List<Cliente> listaDeClientes = Singleton.ObterInstancia();
        private static string conectionString = ConfigurationManager.ConnectionStrings["BancoClientes"].ConnectionString;
        private SqlConnection conexao;

        public List<Cliente> ObterTodosClientes()
        {
            CriarConexao();
            List<Cliente> clientes = new List<Cliente>();
            var sql = "SELECT * FROM Clientes";
            SqlCommand command = new SqlCommand(sql, conexao);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                Cliente cliente = new Cliente()
                { 
                 id = (int)reader.GetInt64(0),
                 nome = reader.GetString(1),
                 dataDeNascimento = reader.GetDateTime(2),
                 sexo = reader.GetString(3),
                 telefone = reader.GetString(4)
                };
                clientes.Add(cliente);
              //  con.Close();             
            }
            return clientes;
        }
        
        public Cliente ObterClientePorId(int id)
        {
            CriarConexao();
            var sql = $"SELECT * FROM Clientes WHERE id = {id}";
            SqlCommand cmd = new SqlCommand(sql, conexao);
            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                Cliente cliente = new Cliente()
                {
                    id = (int)reader.GetInt64(0),
                    nome = reader.GetString(1),
                    dataDeNascimento = reader.GetDateTime(2),
                    sexo = reader.GetString(3),
                    telefone= reader.GetString(4)
                };
              //  con.Close();
                return cliente;
            }
            else { return null; }
           
        }
        public void CriarCliente(Cliente cliente)
        {
            var con = CriarConexao();
            var sql = "INSERT INTO Clientes (nome, dataDeNascimento, sexo, telefone) VALUES (@nome, @dataDeNascimento, @sexo, @telefone)";
            SqlCommand command = new SqlCommand(sql, con);
            command.Parameters.AddWithValue("@nome", cliente.nome);
            command.Parameters.AddWithValue("@dataDeNascimento", cliente.dataDeNascimento);
            command.Parameters.AddWithValue("@sexo", cliente.sexo);
            command.Parameters.AddWithValue("telefone", cliente.telefone);
            command.ExecuteNonQuery();
            con.Close();
        }

        public void AtualizarCliente(Cliente clienteEditado)
        {
            var conexao = CriarConexao();
            var sql = "UPDATE Clientes SET nome=@Nome, dataDeNascimento=@dataDeNascimento, sexo=@sexo, telefone=@telefone "+ $"WHERE id = {clienteEditado.id}";
            SqlCommand command = new SqlCommand(sql, conexao);
            command.Parameters.AddWithValue("@nome", clienteEditado.nome);
            command.Parameters.AddWithValue("@dataDeNascimento", clienteEditado.dataDeNascimento);
            command.Parameters.AddWithValue("@sexo", clienteEditado.sexo);
            command.Parameters.AddWithValue("@telefone", clienteEditado.telefone);
            command.ExecuteNonQuery();
            conexao.Close();
        }
        
        public void RemoverCliente(int id)
        {
            var con = CriarConexao();
            Cliente cliente = ObterClientePorId(id);
            var sql = $"DELETE FROM CLientes WHERE id = {cliente.id}";
            SqlCommand command = new SqlCommand(sql, con);
            command.ExecuteNonQuery();
            con.Close();
           
        }
        private SqlConnection CriarConexao()
        {
            conexao = new SqlConnection(conectionString);
            conexao.Open();
            return conexao;
        }

    }
}
