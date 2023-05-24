using Microsoft.AspNetCore.Mvc;

namespace AplicacaoWeb.Controllers
{
    [ApiController]
    [Route("")]
    public class ControladorRaiz : Controller
    {
        private readonly IWebHostEnvironment _ambienteDeHospedagemWeb;

        public ControladorRaiz(IWebHostEnvironment ambienteDeHospedagemWeb)
        {
            _ambienteDeHospedagemWeb = ambienteDeHospedagemWeb;
        }

        [HttpGet]
        [ResponseCache(Duration = 3600)]
        public FileResult Index()
        {
            var caminhoDoArquivo = Path.Combine(_ambienteDeHospedagemWeb.WebRootPath, "index.html");
            return PhysicalFile(caminhoDoArquivo, "text/html");
        }
    }
}