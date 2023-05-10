using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Windows.Forms;
using System.Configuration;

namespace WindowsFormsAppStart
{
    internal static class Program
    {
        private static string connectionString = ConfigurationManager.ConnectionStrings["BancoClientes"].ConnectionString;

        [STAThread]
        static void Main()
        {
            
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            Application.Run(new TelaInicial(new RepositorioBD()));

            using (var serviceProvider = CreateServices())
            using (var scope = serviceProvider.CreateScope())
            {

                UpdateDatabase(scope.ServiceProvider);
            }

        }
        private static void UpdateDatabase(IServiceProvider serviceProvider)
        {
            var runner = serviceProvider.GetRequiredService<IMigrationRunner>();

            runner.MigrateUp();
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


