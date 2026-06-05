package crud.teste.api.api.controler;

import crud.teste.api.api.dto.ClienteRequestDto;
import crud.teste.api.api.dto.ClienteResponseDto;
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
    public ClienteResponseDto criarCliente(@RequestBody ClienteRequestDto clienteRequestDto) {
       return clienteService.salvar(clienteRequestDto);
    }

    @GetMapping
    public List<ClienteResponseDto> buscarTodosClientes() {
       return clienteService.listarTodos();
    }

    @GetMapping("/{id}")
    public ClienteResponseDto buscarPorId(@PathVariable Long id) {
        return clienteService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public ClienteResponseDto atualizarCliente(@PathVariable Long id, @RequestBody ClienteRequestDto clienteRequestDto) {
        return clienteService.atualizar(id, clienteRequestDto);
    }

    @DeleteMapping("/{id}")
    public String deletarCliente(@PathVariable Long id) {
        return clienteService.deletar(id);
    }





}
