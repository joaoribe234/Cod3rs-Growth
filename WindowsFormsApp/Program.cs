using Infra.Repositorios;
using Infra.Servico;
using WindowsFormsAppStart;

namespace InterfaceUsuario
{
    internal static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new TelaInicial(new Link2DB_Repositorio()));
            MigracaoServico.UpdateDatabase();
        }
    }
}


