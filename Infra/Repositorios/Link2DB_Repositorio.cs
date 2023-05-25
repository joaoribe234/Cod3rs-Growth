using Dominio.Entidades;
using Dominio.Interface;
using Dominio.Mensagens;
using LinqToDB;
using LinqToDB.Data;
using LinqToDB.DataProvider.SqlServer;
using System.Configuration;

namespace Infra.Repositorios
{
    public class Link2DB_Repositorio : IRepositorio
    {
        public List<Clientes> ObterTodosClientes() {

            using (var conexaoLinq2DB = CriarConexao()){
                try 
                {
                    var obterTodosClientes = conexaoLinq2DB.GetTable<Clientes>().ToList();
                    return obterTodosClientes;
                } 
                catch(MensagensDeErros)
                {
                    throw new Exception(ExcecoesBD.FALHA_OBTER_TODOS_CLIENTES);   
                }
            }
        }

        public Clientes ObterClientePorId(int id) {

            using (var conexaoLinq2DB = CriarConexao()){
                try 
                {
                    var obterClientePorId = conexaoLinq2DB.GetTable<Clientes>().FirstOrDefault(p => p.Id == id);
                    return obterClientePorId;

                }
                catch (MensagensDeErros)
                {
                    throw new Exception(ExcecoesBD.FALHA_OBTER_CLIENTE_PELO_ID);
                }
            }
        }

        public void CriarCliente(Clientes cliente) {

            using (var conexaoLinq2DB = CriarConexao()) {
                try
                {
                    conexaoLinq2DB.Insert(cliente);
                }
                catch (MensagensDeErros)
                {
                    throw new Exception(ExcecoesBD.FALHA_CRIACAO_NOVO_CLIENTE);
                }
            }
        }

        public void AtualizarCliente(Clientes cliente) {

            using (var conexaoLinq2DB = CriarConexao()) {
                try
                {
                    conexaoLinq2DB.Update(cliente);
                }
                catch (MensagensDeErros)
                {
                    throw new Exception(ExcecoesBD.FALHA_ATUALIZACAO_CLIENTE);
                }

            }
        }

        public void RemoverCliente(int id) {
            using (var conexaoLinq2DB = CriarConexao()){
                try 
                {
                    var clienteAserRemovidoPorId = ObterClientePorId(id);
                    conexaoLinq2DB.Delete(clienteAserRemovidoPorId);
                }
                catch (MensagensDeErros)
                { 
                   throw new Exception(ExcecoesBD.FALHA_REMOCAO_CLIENTE);
                }
            }
        }

        private DataConnection CriarConexao()
        {
            try
            {
                string StringDeConexao = ConfigurationManager.ConnectionStrings["BancoClientes"].ConnectionString;
                var conexao = SqlServerTools.CreateDataConnection(StringDeConexao);
                return conexao;
            }
            catch (MensagensDeErros)
            {
                throw new Exception(ExcecoesBD.FALHA_CRIACAO_CONEXAO);
            }
        }
    }
}
