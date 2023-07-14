using LinqToDB.Mapping;

namespace Dominio.Entidades
{
    public class Clientes
    {
        [PrimaryKey, Identity]
        public int Id { get; set; }

        [NotNull]
        public string Nome { get; set; }

        [NotNull]
        public DateTime DataDeNascimento { get; set; }

        [NotNull]
        public string Sexo { get; set; }

        [NotNull]
        public string Telefone { get; set; }

    }
}