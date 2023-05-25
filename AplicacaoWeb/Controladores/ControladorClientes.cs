using Dominio.Entidades;
using Dominio.Interface;
using Dominio.Servico;
using Microsoft.AspNetCore.Mvc;

namespace AplicacaoWeb.Controllers
{
    [ApiController]
    [Route("api/clientes")]
    public class ControladorClientes : ControllerBase
    {
        private readonly IRepositorio _repositorio;

        public ControladorClientes(IRepositorio repositorio)
        {
            _repositorio = repositorio;
        }

        [HttpGet]
        public IActionResult ObterTodosClientes() 
        {
            try
            {
                var obterTodosClientes = _repositorio.ObterTodosClientes();
                return Ok(obterTodosClientes);
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        [HttpGet("{id}")]
        public IActionResult ObterClientePorId(int id ) 
        {
            try
            {
                var obterClientePorId = _repositorio.ObterClientePorId(id);
                if (obterClientePorId == null)
                {
                    return NotFound();
                }
                return Ok(obterClientePorId);
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        [HttpPost]
        public IActionResult CriarCliente([FromBody] Clientes clienteASerCriado) 
        {
            try
            {
                if (clienteASerCriado == null)
                {
                    return BadRequest();
                }
                ValidarFormulario.validacaoDeCampos(clienteASerCriado);
                _repositorio.CriarCliente(clienteASerCriado);
                return CreatedAtAction(nameof(ObterClientePorId), new { id = clienteASerCriado.Id }, clienteASerCriado);
            }
            catch(Exception)
            {
                throw new Exception();
            }
        }

        [HttpPut("{id}")]
        public IActionResult AtualizarCliente(int id, [FromBody] Clientes clienteASerEditado)
        {
            try
            {
                var clienteObtidoPorId = _repositorio.ObterClientePorId(id);
                if (clienteObtidoPorId == null)
                {
                    return NotFound();
                }
                if (clienteASerEditado == null)
                {
                    return BadRequest();
                }
                ValidarFormulario.validacaoDeCampos(clienteASerEditado);
                clienteObtidoPorId.Id = clienteASerEditado.Id;
                _repositorio.AtualizarCliente(clienteASerEditado);
                return Ok(clienteASerEditado);
            }
            catch(Exception)
            { 
              throw new Exception();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult RemoverCliente(int id)
        {
            try
            {
                var clienteASerRemovido = _repositorio.ObterClientePorId(id);
                if (clienteASerRemovido == null)
                {
                    return NotFound();
                }
                _repositorio.RemoverCliente(clienteASerRemovido.Id);
                return Ok(clienteASerRemovido);
            }
            catch(Exception) 
            {  
              throw new Exception();
            }
        }
    }
}
