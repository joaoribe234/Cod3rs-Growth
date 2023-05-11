
using FluentMigrator;

namespace WindowsFormsAppStart
{
    [Migration(20230504113600)]
    public class Migracao : Migration
    {
        public override void Up()
        {
            Create.Table("Clientes")
                    .WithColumn("id").AsInt64().PrimaryKey().Identity()
                    .WithColumn("nome").AsString(20).NotNullable()
                    .WithColumn("dataDeNascimento").AsDateTime().NotNullable()
                    .WithColumn("sexo").AsString(20).NotNullable()
                    .WithColumn("telefone").AsString(20).NotNullable();
        }
        public override void Down()
    {
        Delete.Table("Clientes");
    }
    }
}
