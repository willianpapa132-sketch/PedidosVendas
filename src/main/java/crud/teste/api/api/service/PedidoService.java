package crud.teste.api.api.service;

import crud.teste.api.api.dto.PedidoResponseDto;
import crud.teste.api.api.dto.PedidoResquestDto;
import crud.teste.api.api.model.Cliente;
import crud.teste.api.api.model.Pedido;
import crud.teste.api.api.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteService clienteService;

    public PedidoService(PedidoRepository pedidoRepository, ClienteService clienteService) {
        this.pedidoRepository = pedidoRepository;
        this.clienteService = clienteService;
    }

    public PedidoResponseDto salvar(PedidoResquestDto pedidoResquestDto, Long clienteId) {

        Cliente cliente = clienteService.buscarEntidadePorId(clienteId);
        pedidoResquestDto.setCliente(cliente);
        Pedido pedido = new Pedido();
        pedido.setCliente(pedidoResquestDto.getCliente());
        pedido.setDescricao( pedidoResquestDto.getDescricao());
        pedido.setValor(pedidoResquestDto.getValor());
        Pedido pedidoSalvo = pedidoRepository.save(pedido);

        return new PedidoResponseDto(
                pedidoSalvo.getId(), pedidoSalvo.getDescricao(), pedidoSalvo.getValor() , pedidoSalvo.getCliente()
        );
    }

    public List<PedidoResponseDto> listarTodosPedidos() {
        List <Pedido> todosPedidos = pedidoRepository.findAll();
        return todosPedidos.stream()
                .map( Pedido -> new PedidoResponseDto(
                        Pedido.getId(), Pedido.getDescricao(), Pedido.getValor() , Pedido.getCliente())
                ).toList();
    }
    private Pedido buscarEntidadePorId(Long id) {
        return pedidoRepository.findById(id).orElseThrow(() -> new RuntimeException("não foi encontrado esse pedido"));
    }

    public PedidoResponseDto buscarPorId(Long id) {
        Pedido pedidoLocalizado = buscarEntidadePorId(id);
        return new PedidoResponseDto(
                pedidoLocalizado.getId(), pedidoLocalizado.getDescricao(), pedidoLocalizado.getValor() , pedidoLocalizado.getCliente()
        );
    }

    public PedidoResponseDto atualizar(Long id, PedidoResquestDto pedidoAtualizado) {
        Pedido pedidoLocalizado = buscarEntidadePorId(id);

        pedidoLocalizado.setDescricao(pedidoAtualizado.getDescricao());
        pedidoLocalizado.setValor(pedidoAtualizado.getValor());

        Pedido pedidoSalvo =  pedidoRepository.save(pedidoLocalizado);
        return new PedidoResponseDto(
                pedidoSalvo.getId(), pedidoSalvo.getDescricao(), pedidoSalvo.getValor() , pedidoSalvo.getCliente()
        );
    }

    public String deletar(Long id) {
        Pedido pedidoLocalizado = buscarEntidadePorId(id);
        pedidoRepository.delete(pedidoLocalizado);
        return "Pedido removido com sucesso";
    }
}