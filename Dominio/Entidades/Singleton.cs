namespace WindowsFormsAppStart
{
    public sealed class Singleton
    {
        private static List<Clientes> instancia;
        private static int _Id;
        public static List<Clientes> ObterInstancia()
        {
            {
                if (instancia == null)
                {
                    instancia = new List<Clientes>();
                }
                return instancia;
            }

        }
        public static int ObterProximoId()
        {
            return ++_Id;
        }
    }
}
