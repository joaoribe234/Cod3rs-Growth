using System;

namespace WindowsFormsAppStart
{
    public class MensagensDeErros : Exception
    {
        public MensagensDeErros(string message) : base(message)
        {

        }
    }
}
