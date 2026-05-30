package crud.teste.api.api.controler;

import crud.teste.api.api.model.Cliente;
import crud.teste.api.api.service.ClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/clientes")
public class ClienteController {
    //   POST   /clientes
    //GET    /clientes
    //  GET    /clientes/{id}
    //PUT    /clientes/{id}
    // DELETE /clientes/{id}

    private final ClienteService clienteService;
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public Cliente criarCliente(@RequestBody Cliente cliente) {
       return clienteService.salvar(cliente);
    }

    @GetMapping
    public List<Cliente> buscarTodosClientes() {
       return clienteService.listarTodos();
    }

    @GetMapping("/{id}")
    public Cliente buscarPorId(@PathVariable Long id) {
        return clienteService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Cliente atualizarCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
        return clienteService.atualizar(id, cliente);
    }

    @DeleteMapping("/{id}")
    public void deletarCliente(@PathVariable Long id) {
        clienteService.deletar(id);
    }





}
