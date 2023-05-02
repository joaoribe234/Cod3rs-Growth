using System;

namespace WindowsFormsAppStart
{
    class MensagensDeErros : Exception
    {
        public MensagensDeErros(string message) : base(message)
        {

        }
    }
}
