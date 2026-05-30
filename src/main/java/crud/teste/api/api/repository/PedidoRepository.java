package crud.teste.api.api.repository;

import crud.teste.api.api.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface PedidoRepository  extends JpaRepository<Pedido, Long> {
}
