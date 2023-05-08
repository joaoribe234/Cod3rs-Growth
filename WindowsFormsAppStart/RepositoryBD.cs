using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Configuration;


namespace WindowsFormsAppStart
{
     class RepositoryBD : IRepository
     {
        public List<Cliente> listaDeClientes = Singleton.ObterInstancia();
        private static string connectionString = ConfigurationManager.ConnectionStrings["BancoClientes"].ConnectionString;
        private SqlConnection conexao;

        public List<Cliente> ObterTodosClientes()
        {
            CriarConexao();
            List<Cliente> clientes = new List<Cliente>();
            var instrucaoSQL = "SELECT * FROM Clientes";
            SqlCommand command = new SqlCommand(instrucaoSQL, conexao);

            try
            {                                 
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
                }
                return clientes;
            }
            catch (MensagensDeErros ex) 
            {
                throw new MensagensDeErros("Falha na obtenção da lista de clientes !");
            }
            finally { 
            conexao.Close();
            }
        }     
        public Cliente ObterClientePorId(int id)
        {
            CriarConexao();
            var instrucaoSQL = $"SELECT * FROM Clientes WHERE id = {id}";
            SqlCommand cmd = new SqlCommand(instrucaoSQL, conexao);
            try
            {
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    Cliente cliente = new Cliente()
                    {
                        id = (int)reader.GetInt64(0),
                        nome = reader.GetString(1),
                        dataDeNascimento = reader.GetDateTime(2),
                        sexo = reader.GetString(3),
                        telefone = reader.GetString(4)
                    };
                    return cliente;
                }
                else { return null; }
            }
            catch (MensagensDeErros ex)
            {
                throw new MensagensDeErros("Falha na obtenção da lista de cliente pelo ID !");
            }
            finally {
                conexao.Close();
            }
        }
        public void CriarCliente(Cliente cliente)
        {
            var conexao = CriarConexao();
            var instrucaoSQL = "INSERT INTO Clientes (nome, dataDeNascimento, sexo, telefone) VALUES (@nome, @dataDeNascimento, @sexo, @telefone)";
            SqlCommand command = new SqlCommand(instrucaoSQL, conexao);
            command.Parameters.AddWithValue("@nome", cliente.nome);
            command.Parameters.AddWithValue("@dataDeNascimento", cliente.dataDeNascimento);
            command.Parameters.AddWithValue("@sexo", cliente.sexo);
            command.Parameters.AddWithValue("telefone", cliente.telefone);
            try
            {
                command.ExecuteNonQuery();
            }
            catch(MensagensDeErros ex) {
                throw new MensagensDeErros("Falha na criação de cliente !");
            }
            finally {
                conexao.Close();
            }
        }
        public void AtualizarCliente(Cliente clienteEditado)
        {
            var conexao = CriarConexao();
            var instrucaoSQL = "UPDATE Clientes SET nome=@Nome, dataDeNascimento=@dataDeNascimento, sexo=@sexo, telefone=@telefone "+ $"WHERE id = {clienteEditado.id}";
            SqlCommand command = new SqlCommand(instrucaoSQL, conexao);
            command.Parameters.AddWithValue("@nome", clienteEditado.nome);
            command.Parameters.AddWithValue("@dataDeNascimento", clienteEditado.dataDeNascimento);
            command.Parameters.AddWithValue("@sexo", clienteEditado.sexo);
            command.Parameters.AddWithValue("@telefone", clienteEditado.telefone);
            try
            {
                command.ExecuteNonQuery();
            }
            catch (MensagensDeErros ex)
            {
                throw new MensagensDeErros("Falha na atualização de cliente !");
            }
            finally {
                conexao.Close();
            }
        }    
        public void RemoverCliente(int id)
        {
            var conexao = CriarConexao();
            Cliente cliente = ObterClientePorId(id);
            var instrucaoSQL = $"DELETE FROM CLientes WHERE id = {cliente.id}";
            SqlCommand command = new SqlCommand(instrucaoSQL, conexao);
            try
            {
                command.ExecuteNonQuery();
            }
            catch (MensagensDeErros ex)
            {
                throw new MensagensDeErros("Falha na remoção de cliente !");
            }
            finally
            {
                conexao.Close();
            }
        }
        private SqlConnection CriarConexao()
        {
            conexao = new SqlConnection(connectionString);
            conexao.Open();
            return conexao;
        }
    }
}
