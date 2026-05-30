const API_URL = "http://localhost:8080";

function mostrarMensagem(texto) {
    const mensagem = document.getElementById("mensagem");
    mensagem.innerText = texto;
    mensagem.style.display = "block";

    setTimeout(() => {
        mensagem.style.display = "none";
    }, 3000);
}

// CLIENTES

async function criarCliente() {
    const cliente = {
        nome: document.getElementById("clienteNome").value,
        email: document.getElementById("clienteEmail").value,
        telefone: document.getElementById("clienteTelefone").value
    };

    const resposta = await fetch(`${API_URL}/clientes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cliente)
    });

    mostrarMensagem(resposta.ok ? "Cliente cadastrado com sucesso." : "Erro ao cadastrar cliente.");
    listarClientes();
}

async function listarClientes() {
    const resposta = await fetch(`${API_URL}/clientes`);
    const clientes = await resposta.json();

    const lista = document.getElementById("listaClientes");
    lista.innerHTML = "";

    if (clientes.length === 0) {
        lista.innerHTML = `<div class="item">Nenhum cliente cadastrado.</div>`;
        return;
    }

    clientes.forEach(cliente => {
        lista.innerHTML += `
            <div class="item">
                <strong>ID:</strong> ${cliente.id}<br>
                <strong>Nome:</strong> ${cliente.nome}<br>
                <strong>Email:</strong> ${cliente.email}<br>
                <strong>Telefone:</strong> ${cliente.telefone}
            </div>
        `;
    });
}

async function buscarClientePorId() {
    const id = document.getElementById("clienteId").value;

    const resposta = await fetch(`${API_URL}/clientes/${id}`);

    if (!resposta.ok) {
        mostrarMensagem("Cliente não encontrado.");
        return;
    }

    const cliente = await resposta.json();

    document.getElementById("clienteNome").value = cliente.nome;
    document.getElementById("clienteEmail").value = cliente.email;
    document.getElementById("clienteTelefone").value = cliente.telefone;

    mostrarMensagem("Cliente carregado.");
}

async function atualizarCliente() {
    const id = document.getElementById("clienteId").value;

    const cliente = {
        nome: document.getElementById("clienteNome").value,
        email: document.getElementById("clienteEmail").value,
        telefone: document.getElementById("clienteTelefone").value
    };

    const resposta = await fetch(`${API_URL}/clientes/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cliente)
    });

    mostrarMensagem(resposta.ok ? "Cliente atualizado com sucesso." : "Erro ao atualizar cliente.");
    listarClientes();
}

async function deletarCliente() {
    const id = document.getElementById("clienteId").value;

    const resposta = await fetch(`${API_URL}/clientes/${id}`, {
        method: "DELETE"
    });

    mostrarMensagem(resposta.ok ? "Cliente deletado com sucesso." : "Erro ao deletar cliente.");
    listarClientes();
}

// PEDIDOS

async function criarPedido() {
    const clienteId = document.getElementById("pedidoClienteId").value;

    const pedido = {
        descricao: document.getElementById("pedidoDescricao").value,
        valor: document.getElementById("pedidoValor").value
    };

    const resposta = await fetch(`${API_URL}/pedido/cliente/${clienteId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(pedido)
    });

    mostrarMensagem(resposta.ok ? "Pedido cadastrado com sucesso." : "Erro ao cadastrar pedido.");
    listarPedidos();
}

async function listarPedidos() {
    const resposta = await fetch(`${API_URL}/pedido`);
    const pedidos = await resposta.json();

    const lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";

    if (pedidos.length === 0) {
        lista.innerHTML = `<div class="item">Nenhum pedido cadastrado.</div>`;
        return;
    }

    pedidos.forEach(pedido => {
        lista.innerHTML += `
            <div class="item">
                <strong>ID:</strong> ${pedido.id}<br>
                <strong>Descrição:</strong> ${pedido.descricao}<br>
                <strong>Valor:</strong> R$ ${pedido.valor}<br>
                <strong>Cliente:</strong> ${pedido.cliente ? pedido.cliente.nome : "Sem cliente"}<br>
                <strong>ID Cliente:</strong> ${pedido.cliente ? pedido.cliente.id : "-"}
            </div>
        `;
    });
}

async function buscarPedidoPorId() {
    const id = document.getElementById("pedidoId").value;

    const resposta = await fetch(`${API_URL}/pedido/${id}`);

    if (!resposta.ok) {
        mostrarMensagem("Pedido não encontrado.");
        return;
    }

    const pedido = await resposta.json();

    document.getElementById("pedidoDescricao").value = pedido.descricao;
    document.getElementById("pedidoValor").value = pedido.valor;
    document.getElementById("pedidoClienteId").value = pedido.cliente ? pedido.cliente.id : "";

    mostrarMensagem("Pedido carregado.");
}

async function atualizarPedido() {
    const id = document.getElementById("pedidoId").value;

    const pedido = {
        descricao: document.getElementById("pedidoDescricao").value,
        valor: document.getElementById("pedidoValor").value
    };

    const resposta = await fetch(`${API_URL}/pedido/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(pedido)
    });

    mostrarMensagem(resposta.ok ? "Pedido atualizado com sucesso." : "Erro ao atualizar pedido.");
    listarPedidos();
}

async function deletarPedido() {
    const id = document.getElementById("pedidoId").value;

    const resposta = await fetch(`${API_URL}/pedido/${id}`, {
        method: "DELETE"
    });

    mostrarMensagem(resposta.ok ? "Pedido deletado com sucesso." : "Erro ao deletar pedido.");
    listarPedidos();
}

listarClientes();
listarPedidos();