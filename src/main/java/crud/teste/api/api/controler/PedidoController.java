package crud.teste.api.api.controler;

import crud.teste.api.api.model.Pedido;
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
    public void inserirPedido(@RequestBody Pedido pedido, @PathVariable Long id) {
        pedidoService.salvar(pedido, id);
    }

    @GetMapping
    public List<Pedido> buscarTodosPedidos() {
        return pedidoService.listarTodosPedidos();
    }

    @GetMapping("/{id}")
    public Pedido buscarPorId(@PathVariable Long id) {
        return pedidoService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public void atualizarPedido(@PathVariable Long id,@RequestBody Pedido pedido) {
        pedidoService.atualizar(id, pedido);
    }

    @DeleteMapping("/{id}")
    public void deletarPedido(@PathVariable Long id) {
        pedidoService.deletar(id);
    }



}
