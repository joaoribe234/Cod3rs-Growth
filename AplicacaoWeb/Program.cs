using Dominio.Interface;
using Infra.Repositorios;

var construtor = WebApplication.CreateBuilder(args);

construtor.Services.AddControllers();
construtor.Services.AddEndpointsApiExplorer();
construtor.Services.AddSwaggerGen();
construtor.Services.AddScoped<IRepositorio, Link2DB_Repositorio>();
construtor.Services.AddControllers();
construtor.Services.AddCors(opcoes =>
{
    opcoes.AddDefaultPolicy(construtor =>
    {
        construtor.WithOrigins("http://127.0.0.1:5500")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

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
aplicacaoWeb.UseCors();
aplicacaoWeb.Run();





