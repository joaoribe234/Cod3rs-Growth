using Microsoft.Data.SqlClient;
using System.Configuration;

namespace WindowsFormsAppStart
{
    public class RepositorioBD : IRepositorio
    {
        public List<Cliente> listaDeClientes = Singleton.ObterInstancia(); 
        

        public List<Cliente> ObterTodosClientes()
        {
            using (var conexao = CriarConexao())
            {
                try
                {
                    List<Cliente> listaClientes = new List<Cliente>();
                    ConversaoDeDados conversaoDeDados = new ConversaoDeDados();
                    var instrucaoSQL = "SELECT * FROM Clientes";
                    var comando = new SqlCommand(instrucaoSQL, conexao);
                    SqlDataReader leitor = comando.ExecuteReader();
                    listaClientes = conversaoDeDados.ConversaoClientes(leitor);
                    return listaClientes;
                    
                }
                catch (MensagensDeErros ex)
                {
                    throw new MensagensDeErros(ExcecoesBD.FALHA_OBTER_TODOS_CLIENTES);
                }
            }
        }
        public Cliente ObterClientePorId(int id)
        {  
            using (var conexao = CriarConexao()) {             
                try
                {
                    Cliente clienteObtidoPorId = new Cliente();
                    ConversaoDeDados conversaoDeDados = new ConversaoDeDados();
                    var instrucaoSQL = $"SELECT * FROM Clientes WHERE id = {id}";
                    var comando = new SqlCommand(instrucaoSQL, conexao);
                    SqlDataReader leitor = comando.ExecuteReader();
                    clienteObtidoPorId = conversaoDeDados.ConversaoClientePorID(leitor);
                    return clienteObtidoPorId;
                }
                catch (MensagensDeErros ex)
                {
                    throw new MensagensDeErros(ExcecoesBD.FALHA_OBTER_CLIENTE_PELO_ID);
                }
            }
        }
        public void CriarCliente(Cliente cliente)
        {
            using (var conexao = CriarConexao()) {
                try
                {
                    var instrucaoSQL = "INSERT INTO Clientes (nome, dataDeNascimento, sexo, telefone) VALUES (@nome, @dataDeNascimento, @sexo, @telefone)";
                    SqlCommand comando = new SqlCommand(instrucaoSQL, conexao);
                    comando.Parameters.AddWithValue("@nome", cliente.nome);
                    comando.Parameters.AddWithValue("@dataDeNascimento", cliente.dataDeNascimento);
                    comando.Parameters.AddWithValue("@sexo", cliente.sexo);
                    comando.Parameters.AddWithValue("telefone", cliente.telefone);
                    comando.ExecuteNonQuery();
                }
                catch (MensagensDeErros ex)
                {
                    throw new MensagensDeErros(ExcecoesBD.FALHA_CRIACAO_NOVO_CLIENTE);
                }
            }
        }
        public void AtualizarCliente(Cliente clienteEditado)
        {
            using (var conexao = CriarConexao()) {       
                try
                {
                    var instrucaoSQL = "UPDATE Clientes SET nome=@Nome, dataDeNascimento=@dataDeNascimento, sexo=@sexo, telefone=@telefone " + $"WHERE id = {clienteEditado.id}";
                    SqlCommand comando = new SqlCommand(instrucaoSQL, conexao);
                    comando.Parameters.AddWithValue("@nome", clienteEditado.nome);
                    comando.Parameters.AddWithValue("@dataDeNascimento", clienteEditado.dataDeNascimento);
                    comando.Parameters.AddWithValue("@sexo", clienteEditado.sexo);
                    comando.Parameters.AddWithValue("@telefone", clienteEditado.telefone);
                    comando.ExecuteNonQuery();
                }
                catch (MensagensDeErros ex)
                {
                    throw new MensagensDeErros(ExcecoesBD.FALHA_ATUALIZACAO_CLIENTE);
                }
            }
        }
        public void RemoverCliente(int id)
        {
            using (var conexao = CriarConexao())
            {         
                try
                {
                    Cliente cliente = ObterClientePorId(id);
                    var instrucaoSQL = $"DELETE FROM CLientes WHERE id = {cliente.id}";
                    SqlCommand comando = new SqlCommand(instrucaoSQL, conexao);
                    comando.ExecuteNonQuery();
                }
                catch (MensagensDeErros ex)
                {
                    throw new MensagensDeErros(ExcecoesBD.FALHA_REMOCAO_CLIENTE);
                }
            }
        }
        private SqlConnection CriarConexao()
        {
            try
            {
                string StringDeConexao = ConfigurationManager.ConnectionStrings["BancoClientes"].ConnectionString;
                var conexao = new SqlConnection(StringDeConexao);
                conexao.Open();
                return conexao;
            }
            catch(MensagensDeErros ex) {
               throw new MensagensDeErros(ExcecoesBD.FALHA_CRIACAO_CONEXAO);
            }
        }
    }
}

