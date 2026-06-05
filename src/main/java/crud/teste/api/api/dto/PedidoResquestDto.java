package crud.teste.api.api.dto;

import crud.teste.api.api.model.Cliente;

import java.math.BigDecimal;

public class PedidoResquestDto {

    private String descricao;
    private BigDecimal valor;
    private Cliente cliente;

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
