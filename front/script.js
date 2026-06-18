const API_URL = "http://localhost:8080";
const TOKEN_KEY = "auth_token";

function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

function mostrarMensagem(texto) {
    const mensagem = document.getElementById("mensagem");
    mensagem.innerText = texto;
    mensagem.style.display = "block";

    setTimeout(() => {
        mensagem.style.display = "none";
    }, 3000);
}

function mostrarAuthStatus(texto, tipo = "success") {
    const status = document.getElementById("authStatus");
    status.innerText = texto;
    status.className = `auth-status ${tipo}`;
}

function limparAuthStatus() {
    const status = document.getElementById("authStatus");
    status.innerText = "";
    status.className = "auth-status hidden";
}

function mostrarAuth(tipo) {
    const loginAtivo = tipo === "login";

    document.getElementById("loginForm").classList.toggle("hidden", !loginAtivo);
    document.getElementById("registroForm").classList.toggle("hidden", loginAtivo);
    document.getElementById("loginTab").classList.toggle("active", loginAtivo);
    document.getElementById("registroTab").classList.toggle("active", !loginAtivo);
    limparAuthStatus();
}

function mostrarApp(autenticado) {
    document.getElementById("authView").classList.toggle("hidden", autenticado);
    document.getElementById("appView").classList.toggle("hidden", !autenticado);
    document.getElementById("logoutButton").classList.toggle("hidden", !autenticado);
}

async function apiFetch(path, options = {}) {
    const token = getToken();
    const headers = {
        ...(options.body ? {"Content-Type": "application/json"} : {}),
        ...(token ? {"Authorization": `Bearer ${token}`} : {}),
        ...(options.headers || {})
    };

    let resposta;

    try {
        resposta = await fetch(`${API_URL}${path}`, {
            ...options,
            headers
        });
    } catch (error) {
        mostrarMensagem("Nao foi possivel conectar na API. Verifique se o Spring esta rodando e se o CORS esta liberado.");
        throw error;
    }

    if (resposta.status === 401 || resposta.status === 403) {
        clearToken();
        mostrarApp(false);
        mostrarMensagem("Sessao expirada ou sem permissao. Faca login novamente.");
    }

    return resposta;
}

async function login() {
    const dados = {
        login: document.getElementById("loginUsuario").value,
        password: document.getElementById("loginSenha").value
    };

    let resposta;

    try {
        resposta = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dados)
        });
    } catch (error) {
        mostrarAuthStatus("Nao foi possivel conectar na API. Verifique se o Spring esta rodando e se o CORS esta liberado.", "error");
        mostrarMensagem("Erro de conexao com a API.");
        return;
    }

    if (!resposta.ok) {
        mostrarAuthStatus("Login ou senha invalidos.", "error");
        mostrarMensagem("Login ou senha invalidos.");
        return;
    }

    const body = await resposta.json();
    setToken(body.token);
    mostrarApp(true);
    mostrarMensagem("Login realizado.");
    listarClientes();
    listarPedidos();
}

async function registrarUsuario() {
    const dados = {
        login: document.getElementById("registroUsuario").value,
        password: document.getElementById("registroSenha").value,
        role: document.getElementById("registroRole").value
    };

    let resposta;

    try {
        resposta = await fetch(`${API_URL}/auth/registro`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dados)
        });
    } catch (error) {
        mostrarAuthStatus("Nao foi possivel conectar na API. Verifique se o Spring esta rodando e se o CORS esta liberado.", "error");
        mostrarMensagem("Erro de conexao com a API.");
        return;
    }

    if (!resposta.ok) {
        mostrarAuthStatus("Erro ao cadastrar usuario.", "error");
        mostrarMensagem("Erro ao cadastrar usuario.");
        return;
    }

    mostrarAuthStatus("Cadastro efetuado com sucesso. Agora faca login.", "success");
    mostrarMensagem("Usuario cadastrado. Agora faca login.");
    mostrarAuth("login");
    mostrarAuthStatus("Cadastro efetuado com sucesso. Agora faca login.", "success");
    document.getElementById("loginUsuario").value = dados.login;
}

function logout() {
    clearToken();
    mostrarApp(false);
    mostrarMensagem("Voce saiu.");
}

async function lerJson(resposta) {
    if (resposta.status === 204) return null;
    return resposta.json();
}

// CLIENTES

async function criarCliente() {
    const cliente = {
        nome: document.getElementById("clienteNome").value,
        email: document.getElementById("clienteEmail").value,
        telefone: document.getElementById("clienteTelefone").value
    };

    let resposta;

    try {
        resposta = await apiFetch("/clientes", {
            method: "POST",
            body: JSON.stringify(cliente)
        });
    } catch (error) {
        return;
    }

    mostrarMensagem(resposta.ok ? "Cliente cadastrado com sucesso." : "Erro ao cadastrar cliente.");
    if (resposta.ok) listarClientes();
}

async function listarClientes() {
    let resposta;

    try {
        resposta = await apiFetch("/clientes");
    } catch (error) {
        return;
    }

    if (!resposta.ok) return;

    const clientes = await lerJson(resposta);
    const lista = document.getElementById("listaClientes");
    lista.innerHTML = "";

    if (!clientes || clientes.length === 0) {
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
    let resposta;

    try {
        resposta = await apiFetch(`/clientes/${id}`);
    } catch (error) {
        return;
    }

    if (!resposta.ok) {
        mostrarMensagem("Cliente nao encontrado.");
        return;
    }

    const cliente = await lerJson(resposta);
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

    let resposta;

    try {
        resposta = await apiFetch(`/clientes/${id}`, {
            method: "PUT",
            body: JSON.stringify(cliente)
        });
    } catch (error) {
        return;
    }

    mostrarMensagem(resposta.ok ? "Cliente atualizado com sucesso." : "Erro ao atualizar cliente.");
    if (resposta.ok) listarClientes();
}

async function deletarCliente() {
    const id = document.getElementById("clienteId").value;
    let resposta;

    try {
        resposta = await apiFetch(`/clientes/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        return;
    }

    mostrarMensagem(resposta.ok ? "Cliente deletado com sucesso." : "Erro ao deletar cliente.");
    if (resposta.ok) listarClientes();
}

// PEDIDOS

async function criarPedido() {
    const clienteId = document.getElementById("pedidoClienteId").value;
    const pedido = {
        descricao: document.getElementById("pedidoDescricao").value,
        valor: document.getElementById("pedidoValor").value
    };

    let resposta;

    try {
        resposta = await apiFetch(`/pedido/cliente/${clienteId}`, {
            method: "POST",
            body: JSON.stringify(pedido)
        });
    } catch (error) {
        return;
    }

    mostrarMensagem(resposta.ok ? "Pedido cadastrado com sucesso." : "Erro ao cadastrar pedido.");
    if (resposta.ok) listarPedidos();
}

async function listarPedidos() {
    let resposta;

    try {
        resposta = await apiFetch("/pedido");
    } catch (error) {
        return;
    }

    if (!resposta.ok) return;

    const pedidos = await lerJson(resposta);
    const lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";

    if (!pedidos || pedidos.length === 0) {
        lista.innerHTML = `<div class="item">Nenhum pedido cadastrado.</div>`;
        return;
    }

    pedidos.forEach(pedido => {
        lista.innerHTML += `
            <div class="item">
                <strong>ID:</strong> ${pedido.id}<br>
                <strong>Descricao:</strong> ${pedido.descricao}<br>
                <strong>Valor:</strong> R$ ${pedido.valor}<br>
                <strong>Cliente:</strong> ${pedido.cliente ? pedido.cliente.nome : "Sem cliente"}<br>
                <strong>ID Cliente:</strong> ${pedido.cliente ? pedido.cliente.id : "-"}
            </div>
        `;
    });
}

async function buscarPedidoPorId() {
    const id = document.getElementById("pedidoId").value;
    let resposta;

    try {
        resposta = await apiFetch(`/pedido/${id}`);
    } catch (error) {
        return;
    }

    if (!resposta.ok) {
        mostrarMensagem("Pedido nao encontrado.");
        return;
    }

    const pedido = await lerJson(resposta);
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

    let resposta;

    try {
        resposta = await apiFetch(`/pedido/${id}`, {
            method: "PUT",
            body: JSON.stringify(pedido)
        });
    } catch (error) {
        return;
    }

    mostrarMensagem(resposta.ok ? "Pedido atualizado com sucesso." : "Erro ao atualizar pedido.");
    if (resposta.ok) listarPedidos();
}

async function deletarPedido() {
    const id = document.getElementById("pedidoId").value;
    let resposta;

    try {
        resposta = await apiFetch(`/pedido/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        return;
    }

    mostrarMensagem(resposta.ok ? "Pedido deletado com sucesso." : "Erro ao deletar pedido.");
    if (resposta.ok) listarPedidos();
}

if (getToken()) {
    mostrarApp(true);
    listarClientes();
    listarPedidos();
} else {
    mostrarApp(false);
}
