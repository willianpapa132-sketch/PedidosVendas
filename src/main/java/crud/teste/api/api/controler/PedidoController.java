package crud.teste.api.api.controler;

import crud.teste.api.api.dto.PedidoResponseDto;
import crud.teste.api.api.dto.PedidoResquestDto;
import java.util.List;
import crud.teste.api.api.service.PedidoService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pedido")
public class PedidoController {
    //POST   /pedidos/cliente/{clienteId}
   // GET    /pedidos
    //GET    /pedidos/{id}
    //PUT    /pedidos/{id}
    //DELETE /pedidos/{id}
    private final PedidoService pedidoService;
    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping("/cliente/{id}")
    public void inserirPedido(@RequestBody PedidoResquestDto pedidoResquestDto, @PathVariable Long id) {
        pedidoService.salvar(pedidoResquestDto, id);
    }

    @GetMapping
    public List<PedidoResponseDto> buscarTodosPedidos() {
        return pedidoService.listarTodosPedidos();
    }

    @GetMapping("/{id}")
    public PedidoResponseDto buscarPorId(@PathVariable Long id) {
        return pedidoService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public PedidoResponseDto atualizarPedido(@PathVariable Long id,@RequestBody PedidoResquestDto pedidoRequestDto) {
        return pedidoService.atualizar(id, pedidoRequestDto);
    }

    @DeleteMapping("/{id}")
    public void deletarPedido(@PathVariable Long id) {
        pedidoService.deletar(id);
    }



}
