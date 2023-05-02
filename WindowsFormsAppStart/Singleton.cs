using System.Collections.Generic;

namespace WindowsFormsAppStart
{
    public sealed class Singleton
    {
        private static List<Cliente> instancia;
        private static int _Id;
        public static List<Cliente> ObterInstancia()
        {
            {
                if (instancia == null)
                {
                    instancia = new List<Cliente>();
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