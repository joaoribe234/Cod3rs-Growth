﻿namespace Dominio.Mensagens
{
    public class MensagensDeErros : Exception
    {
        public MensagensDeErros(string message) : base(message)
        {

        }
    }
}
