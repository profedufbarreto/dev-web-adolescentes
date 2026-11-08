// Footer

document.getElementById("year").textContent = new Date().getFullYear();


// ======================================
// 1. CADASTRO DOS PRODUTOS
// ======================================

const produtos = [

    {
        id: 1,
        nome: "Classic Burger",
        categoria: "hamburgueres",
        descricao: "Hambúrguer artesanal, queijo e molho especial.",
        preco: 29.90,
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
    },

    {
        id: 2,
        nome: "Bacon Supreme",
        categoria: "hamburgueres",
        descricao: "Hambúrguer, bacon crocante e queijo cheddar.",
        preco: 34.90,
        imagem: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=600"
    },

    {
        id: 3,
        nome: "Double Cheese",
        categoria: "hamburgueres",
        descricao: "Dois hambúrgueres, queijo duplo e molho da casa.",
        preco: 39.90,
        imagem: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=600"
    },

    {
        id: 4,
        nome: "Pizza Pepperoni",
        categoria: "pizzas",
        descricao: "Molho de tomate, queijo e pepperoni.",
        preco: 49.90,
        imagem: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600"
    },

    {
        id: 5,
        nome: "Pizza Margherita",
        categoria: "pizzas",
        descricao: "Queijo, tomate fresco e manjericão.",
        preco: 45.90,
        imagem: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600"
    },

    {
        id: 6,
        nome: "Refrigerante",
        categoria: "bebidas",
        descricao: "Refrigerante gelado de 350 ml.",
        preco: 7.00,
        imagem: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=600"
    },

    {
        id: 7,
        nome: "Suco Natural",
        categoria: "bebidas",
        descricao: "Suco natural de laranja.",
        preco: 9.90,
        imagem: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600"
    },

    {
        id: 8,
        nome: "Brownie",
        categoria: "sobremesas",
        descricao: "Brownie de chocolate com calda especial.",
        preco: 14.90,
        imagem: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600"
    },

    {
        id: 9,
        nome: "Cheesecake",
        categoria: "sobremesas",
        descricao: "Cheesecake cremoso com cobertura de frutas.",
        preco: 16.90,
        imagem: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600"
    }

];


// ======================================
// 2. SELEÇÃO DOS ELEMENTOS HTML
// ======================================

const listaProdutos = document.querySelector("#listaProdutos");

const filtros = document.querySelectorAll(".filtro");

const campoPesquisa = document.querySelector("#campoPesquisa");

const mensagemVazia = document.querySelector("#mensagemVazia");

const abrirCarrinho = document.querySelector("#abrirCarrinho");

const fecharCarrinho = document.querySelector("#fecharCarrinho");

const areaCarrinho = document.querySelector("#areaCarrinho");

const fundoCarrinho = document.querySelector("#fundoCarrinho");

const itensCarrinho = document.querySelector("#itensCarrinho");

const contadorCarrinho = document.querySelector("#contadorCarrinho");

const subtotalElemento = document.querySelector("#subtotal");

const valorEntregaElemento = document.querySelector("#valorEntrega");

const totalElemento = document.querySelector("#total");

const formPedido = document.querySelector("#formPedido");

const mensagemPedido = document.querySelector("#mensagemPedido");


// ======================================
// 3. VARIÁVEIS DO SISTEMA
// ======================================

let carrinho = [];

let categoriaSelecionada = "todos";

const valorEntrega = 5;


// ======================================
// 4. FORMATAR VALORES EM REAIS
// ======================================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// ======================================
// 5. EXIBIR OS PRODUTOS
// ======================================

function mostrarProdutos(lista) {

    listaProdutos.innerHTML = "";

    mensagemVazia.style.display = lista.length === 0
        ? "block"
        : "none";

    lista.forEach(function(produto) {

        const card = document.createElement("article");

        card.classList.add("card-produto");

        card.innerHTML = `

            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="info-produto">

                <h3>${produto.nome}</h3>

                <p>${produto.descricao}</p>

                <span class="preco-produto">
                    ${formatarMoeda(produto.preco)}
                </span>

                <button
                    class="botao-adicionar"
                    data-id="${produto.id}">

                    Adicionar ao carrinho

                </button>

            </div>

        `;

        listaProdutos.appendChild(card);

    });

}


// ======================================
// 6. FILTRAR OS PRODUTOS
// ======================================

function filtrarProdutos() {

    const texto = campoPesquisa.value.toLowerCase();

    const resultado = produtos.filter(function(produto) {

        const correspondeCategoria =
            categoriaSelecionada === "todos" ||
            produto.categoria === categoriaSelecionada;

        const correspondePesquisa =
            produto.nome.toLowerCase().includes(texto);

        return correspondeCategoria && correspondePesquisa;

    });

    mostrarProdutos(resultado);

}


// ======================================
// 7. CLICAR NOS FILTROS
// ======================================

filtros.forEach(function(botao) {

    botao.addEventListener("click", function() {

        filtros.forEach(function(filtro) {
            filtro.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        categoriaSelecionada = botao.dataset.categoria;

        filtrarProdutos();

    });

});


// ======================================
// 8. PESQUISAR PRODUTOS
// ======================================

campoPesquisa.addEventListener("input", function() {

    filtrarProdutos();

});


// ======================================
// 9. ADICIONAR PRODUTOS AO CARRINHO
// ======================================

listaProdutos.addEventListener("click", function(event) {

    if (!event.target.classList.contains("botao-adicionar")) {
        return;
    }

    const id = Number(event.target.dataset.id);

    const produto = produtos.find(function(item) {
        return item.id === id;
    });

    const produtoNoCarrinho = carrinho.find(function(item) {
        return item.id === id;
    });

    if (produtoNoCarrinho) {

        produtoNoCarrinho.quantidade++;

    } else {

        carrinho.push({
            ...produto,
            quantidade: 1
        });

    }

    atualizarCarrinho();

});


// ======================================
// 10. ATUALIZAR O CARRINHO
// ======================================

function atualizarCarrinho() {

    itensCarrinho.innerHTML = "";

    let subtotal = 0;

    let quantidadeTotal = 0;

    carrinho.forEach(function(produto) {

        const totalProduto = produto.preco * produto.quantidade;

        subtotal += totalProduto;

        quantidadeTotal += produto.quantidade;

        const item = document.createElement("div");

        item.classList.add("item-carrinho");

        item.innerHTML = `

            <div>

                <h4>${produto.nome}</h4>

                <p>${formatarMoeda(totalProduto)}</p>

                <div class="controles-quantidade">

                    <button data-acao="diminuir" data-id="${produto.id}">
                        -
                    </button>

                    <span>${produto.quantidade}</span>

                    <button data-acao="aumentar" data-id="${produto.id}">
                        +
                    </button>

                </div>

            </div>

            <button
                class="botao-remover"
                data-acao="remover"
                data-id="${produto.id}">

                Remover

            </button>

        `;

        itensCarrinho.appendChild(item);

    });

    contadorCarrinho.textContent = quantidadeTotal;

    const entrega = carrinho.length > 0 ? valorEntrega : 0;

    subtotalElemento.textContent = formatarMoeda(subtotal);

    valorEntregaElemento.textContent = formatarMoeda(entrega);

    totalElemento.textContent = formatarMoeda(subtotal + entrega);

    if (carrinho.length === 0) {

        itensCarrinho.textContent = "Seu carrinho está vazio.";

    }

}


// ======================================
// 11. ALTERAR QUANTIDADE E REMOVER ITENS
// ======================================

itensCarrinho.addEventListener("click", function(event) {

    const botao = event.target.closest("button");

    if (!botao) {
        return;
    }

    const id = Number(botao.dataset.id);

    const acao = botao.dataset.acao;

    const produto = carrinho.find(function(item) {
        return item.id === id;
    });

    if (!produto) {
        return;
    }

    if (acao === "aumentar") {

        produto.quantidade++;

    }

    if (acao === "diminuir") {

        produto.quantidade--;

        if (produto.quantidade <= 0) {

            carrinho = carrinho.filter(function(item) {
                return item.id !== id;
            });

        }

    }

    if (acao === "remover") {

        carrinho = carrinho.filter(function(item) {
            return item.id !== id;
        });

    }

    atualizarCarrinho();

});


// ======================================
// 12. ABRIR E FECHAR O CARRINHO
// ======================================

function abrirPainelCarrinho() {

    areaCarrinho.classList.add("aberto");

    fundoCarrinho.classList.add("visivel");

}

function fecharPainelCarrinho() {

    areaCarrinho.classList.remove("aberto");

    fundoCarrinho.classList.remove("visivel");

}

abrirCarrinho.addEventListener("click", abrirPainelCarrinho);

fecharCarrinho.addEventListener("click", fecharPainelCarrinho);

fundoCarrinho.addEventListener("click", fecharPainelCarrinho);


// ======================================
// 13. FINALIZAR PEDIDO
// ======================================

formPedido.addEventListener("submit", function(event) {

    event.preventDefault();

    if (carrinho.length === 0) {

        mensagemPedido.textContent =
            "Adicione produtos ao carrinho antes de finalizar.";

        return;

    }

    const nome = document.querySelector("#nomeCliente").value;

    const endereco = document.querySelector("#enderecoCliente").value;

    mensagemPedido.textContent =
        "Obrigado, " + nome +
        "! Seu pedido foi registrado para entrega em " +
        endereco + ". Total: " + totalElemento.textContent;

    carrinho = [];

    atualizarCarrinho();

    formPedido.reset();

});


// ======================================
// 14. INICIALIZAÇÃO DO SITE
// ======================================

mostrarProdutos(produtos);

atualizarCarrinho();
