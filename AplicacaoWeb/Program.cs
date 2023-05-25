using Dominio.Interface;
using Infra.Repositorios;

var construtor = WebApplication.CreateBuilder(args);

construtor.Services.AddControllers();
construtor.Services.AddEndpointsApiExplorer();
construtor.Services.AddSwaggerGen();
construtor.Services.AddScoped<IRepositorio, Link2DB_Repositorio>();
construtor.Services.AddControllers();

var aplicacaoWeb = construtor.Build();
if (aplicacaoWeb.Environment.IsDevelopment())
{
    aplicacaoWeb.UseSwagger();
    aplicacaoWeb.UseSwaggerUI();
}
aplicacaoWeb.UseHttpsRedirection();
aplicacaoWeb.UseStaticFiles();
aplicacaoWeb.UseDefaultFiles();
aplicacaoWeb.MapDefaultControllerRoute();
aplicacaoWeb.Run();





