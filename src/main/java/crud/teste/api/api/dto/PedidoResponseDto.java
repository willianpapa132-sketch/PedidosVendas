package crud.teste.api.api.dto;

import crud.teste.api.api.model.Cliente;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.math.BigDecimal;

public class PedidoResponseDto {

    private Long id;
    private String descricao;
    private BigDecimal valor;
    private Cliente cliente;

    public PedidoResponseDto(Long id, String descricao, BigDecimal valor, Cliente cliente) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
        this.cliente = cliente;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
