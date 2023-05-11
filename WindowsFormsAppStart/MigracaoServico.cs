using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;
using System.Configuration;

namespace WindowsFormsAppStart
{
    static class MigracaoServico
    {
        private static string connectionString = ConfigurationManager.ConnectionStrings["BancoClientes"].ConnectionString;

        public static void UpdateDatabase()
        {
            using (var serviceProvider = CreateServices())
            using (var scope = serviceProvider.CreateScope())
            {
                var runner = serviceProvider.GetRequiredService<IMigrationRunner>();
                runner.MigrateUp();
            }
        }

        private static ServiceProvider CreateServices()
        {
            return new ServiceCollection()

                .AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    .AddSqlServer()
                    .WithGlobalConnectionString(connectionString)
                    .ScanIn(typeof(Migracao).Assembly).For.Migrations())
                .AddLogging(lb => lb.AddFluentMigratorConsole())

                .BuildServiceProvider(false);
        }
    }
}

