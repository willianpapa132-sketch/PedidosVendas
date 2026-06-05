package crud.teste.api.api.service;

import crud.teste.api.api.dto.ClienteRequestDto;
import crud.teste.api.api.dto.ClienteResponseDto;
import crud.teste.api.api.hendler.BusinessException;
import crud.teste.api.api.model.Cliente;
import crud.teste.api.api.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public ClienteResponseDto salvar(ClienteRequestDto clienteRequestDto) {
        Cliente cliente = new Cliente();

        cliente.setNome(clienteRequestDto.getNome());
        cliente.setEmail(clienteRequestDto.getEmail());
        cliente.setTelefone(clienteRequestDto.getTelefone());

        if(cliente.getNome() == null || cliente.getNome().isBlank()){
            throw new BusinessException("O campo de nome é obrigatorio");
        }

        Cliente clienteSalvo =  clienteRepository.save(cliente);

        return new ClienteResponseDto(clienteSalvo.getId(), clienteSalvo.getNome(), clienteSalvo.getEmail(), clienteSalvo.getTelefone()
        );
    }

    public List<ClienteResponseDto> listarTodos() {

        List <Cliente> clientes = clienteRepository.findAll();

        return clientes.stream()
                .map(cliente -> new ClienteResponseDto(
                        cliente.getId(), cliente.getNome(), cliente.getEmail(), cliente.getTelefone())
                ).toList();
    }
    public Cliente buscarEntidadePorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Cliente não encontrado"));
    }

    public ClienteResponseDto buscarPorId(Long id) {
        Cliente cliente = buscarEntidadePorId(id);
        return new ClienteResponseDto(
                cliente.getId(), cliente.getNome(), cliente.getEmail(), cliente.getTelefone()
        );
    }

    public ClienteResponseDto atualizar(Long id, ClienteRequestDto clienteRequestDto) {
        Cliente cliente = buscarEntidadePorId(id);

        cliente.setNome(clienteRequestDto.getNome());
        cliente.setEmail(clienteRequestDto.getEmail());
        cliente.setTelefone(clienteRequestDto.getTelefone());

        if(cliente.getNome() == null || cliente.getNome().isBlank()){
            throw new BusinessException("O campo de nome é obrigatorio");
        }
        Cliente clienteSalvo = clienteRepository.save(cliente);

        return new ClienteResponseDto(
                clienteSalvo.getId(), clienteSalvo.getNome(), clienteSalvo.getEmail(), clienteSalvo.getTelefone()
        );
    }

    public String deletar(Long id) {
        Cliente cliente = buscarEntidadePorId(id);
        clienteRepository.delete(cliente);
        String msg = "Cliente removido com sucesso";
        return msg;
    }
}