using Microsoft.Data.SqlClient;
using System.Configuration;

namespace WindowsFormsAppStart
{
    public class RepositorioBD : IRepositorio
    {
        public List<Clientes> listaDeClientes = Singleton.ObterInstancia(); 
        

        public List<Clientes> ObterTodosClientes()
        {
            using (var conexao = CriarConexao())
            {
                try
                {
                    List<Clientes> listaClientes = new List<Clientes>();
                    ConversaoDeDados conversaoDeDados = new ConversaoDeDados();
                    var instrucaoSQL = "SELECT * FROM Clientes";
                    var comando = new SqlCommand(instrucaoSQL, conexao);
                    SqlDataReader leitor = comando.ExecuteReader();
                    listaClientes = conversaoDeDados.ConversaoClientes(leitor);
                    return listaClientes;
                    
                }
                catch (MensagensDeErros)
                {
                    throw new MensagensDeErros(ExcecoesBD.FALHA_OBTER_TODOS_CLIENTES);
                }
            }
        }
        public Clientes ObterClientePorId(int id)
        {  
            using (var conexao = CriarConexao()) {             
                try
                {
                    Clientes clienteObtidoPorId = new Clientes();
                    ConversaoDeDados conversaoDeDados = new ConversaoDeDados();
                    var instrucaoSQL = $"SELECT * FROM Clientes WHERE id = {id}";
                    var comando = new SqlCommand(instrucaoSQL, conexao);
                    SqlDataReader leitor = comando.ExecuteReader();
                    clienteObtidoPorId = conversaoDeDados.ConversaoClientePorID(leitor);
                    return clienteObtidoPorId;
                }
                catch (MensagensDeErros)
                {
                    throw new MensagensDeErros(ExcecoesBD.FALHA_OBTER_CLIENTE_PELO_ID);
                }
            }
        }
        public void CriarCliente(Clientes cliente)
        {
            using (var conexao = CriarConexao()) {
                try
                {
                    var instrucaoSQL = "INSERT INTO Clientes (nome, dataDeNascimento, sexo, telefone) VALUES (@nome, @dataDeNascimento, @sexo, @telefone)";
                    SqlCommand comando = new SqlCommand(instrucaoSQL, conexao);
                    comando.Parameters.AddWithValue("@nome", cliente.Nome);
                    comando.Parameters.AddWithValue("@dataDeNascimento", cliente.DataDeNascimento);
                    comando.Parameters.AddWithValue("@sexo", cliente.Sexo);
                    comando.Parameters.AddWithValue("telefone", cliente.Telefone);
                    comando.ExecuteNonQuery();
                }
                catch (MensagensDeErros)
                {
                    throw new MensagensDeErros(ExcecoesBD.FALHA_CRIACAO_NOVO_CLIENTE);
                }
            }
        }
        public void AtualizarCliente(Clientes clienteEditado)
        {
            using (var conexao = CriarConexao()) {       
                try
                {
                    var instrucaoSQL = "UPDATE Clientes SET nome=@Nome, dataDeNascimento=@dataDeNascimento, sexo=@sexo, telefone=@telefone " + $"WHERE id = {clienteEditado.Id}";
                    SqlCommand comando = new SqlCommand(instrucaoSQL, conexao);
                    comando.Parameters.AddWithValue("@nome", clienteEditado.Nome);
                    comando.Parameters.AddWithValue("@dataDeNascimento", clienteEditado.DataDeNascimento);
                    comando.Parameters.AddWithValue("@sexo", clienteEditado.Sexo);
                    comando.Parameters.AddWithValue("@telefone", clienteEditado.Telefone);
                    comando.ExecuteNonQuery();
                }
                catch (MensagensDeErros)
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
                    Clientes cliente = ObterClientePorId(id);
                    var instrucaoSQL = $"DELETE FROM CLientes WHERE id = {cliente.Id}";
                    SqlCommand comando = new SqlCommand(instrucaoSQL, conexao);
                    comando.ExecuteNonQuery();
                }
                catch (MensagensDeErros)
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
            catch(MensagensDeErros) {
               throw new MensagensDeErros(ExcecoesBD.FALHA_CRIACAO_CONEXAO);
            }
        }
    }
}

