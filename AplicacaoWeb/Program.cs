using Dominio.Interface;
using Infra.Repositorios;
using Microsoft.AspNetCore.StaticFiles;
using System.Text.Json.Serialization;

var construtor = WebApplication.CreateBuilder(args);

construtor.Services.AddControllers();
construtor.Services.AddEndpointsApiExplorer();
construtor.Services.AddSwaggerGen();
construtor.Services.AddScoped<IRepositorio, Link2DB_Repositorio>();

construtor.Services.AddControllers().AddJsonOptions(opcao =>
{
    opcao.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

var aplicacaoWeb = construtor.Build();

if (aplicacaoWeb.Environment.IsDevelopment())
{
    aplicacaoWeb.UseSwagger();
    aplicacaoWeb.UseSwaggerUI();
}

aplicacaoWeb.UseHttpsRedirection();

aplicacaoWeb.UseStaticFiles(new StaticFileOptions
{
    ServeUnknownFileTypes = true,
    DefaultContentType = "text/plain;charset=utf-8",
    ContentTypeProvider = new FileExtensionContentTypeProvider(new Dictionary<string, string>
                {
                    {".properties", "text/plain;charset=utf-8" }
                })
});

aplicacaoWeb.MapDefaultControllerRoute();
aplicacaoWeb.Run();


