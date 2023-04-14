using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsAppStart
{
    internal class Cliente
    {
        public Cliente(int id, string nome, DateTime dataNascimento, string sexo, string telefone)
        {
            this.id = id;
            this.nome = nome;
            this.dataNascimento = dataNascimento;
            this.sexo = sexo;
            this.telefone = telefone;
        }

        public int id;
        public string nome ;
        public DateTime dataNascimento;
        public string sexo;
        public string telefone;

        
    }
}
