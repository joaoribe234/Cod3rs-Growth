namespace WindowsFormsAppStart
{
    internal static class Program
    {
        [STAThread]
        static void Main()
        {  
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new TelaInicial(new RepositorioBD()));
            MigracaoServico.UpdateDatabase();
        }   
    }
}


