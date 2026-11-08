
// ==========================================
// LISTA DE DESTINOS
// ==========================================

const destinos = [

    {
        nome: "Rio de Janeiro",
        regiao: "Brasil",
        categoria: "brasil",
        descricao: "Praias, paisagens incríveis e o charme da Cidade Maravilhosa.",
        preco: "R$ 1.890",
        imagem: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800"
    },

    {
        nome: "Fernando de Noronha",
        regiao: "Brasil",
        categoria: "brasil",
        descricao: "Águas cristalinas e praias paradisíacas.",
        preco: "R$ 3.490",
        imagem: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800"
    },

    {
        nome: "Foz do Iguaçu",
        regiao: "Brasil",
        categoria: "brasil",
        descricao: "Conheça uma das maiores maravilhas naturais do mundo.",
        preco: "R$ 1.590",
        imagem: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800"
    },

    {
        nome: "Gramado",
        regiao: "Brasil",
        categoria: "brasil",
        descricao: "Clima europeu, gastronomia e paisagens encantadoras.",
        preco: "R$ 1.290",
        imagem: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800"
    },

    {
        nome: "Paris",
        regiao: "Europa",
        categoria: "internacional",
        descricao: "A cidade da Torre Eiffel, da arte e do romance.",
        preco: "R$ 6.990",
        imagem: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800"
    },

    {
        nome: "Maldivas",
        regiao: "Ásia",
        categoria: "internacional",
        descricao: "Resorts paradisíacos e águas azul-turquesa.",
        preco: "R$ 9.890",
        imagem: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800"
    },

    {
        nome: "Nova York",
        regiao: "América do Norte",
        categoria: "internacional",
        descricao: "Arranha-céus, cultura e uma cidade que nunca dorme.",
        preco: "R$ 7.490",
        imagem: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800"
    },

    {
        nome: "Roma",
        regiao: "Europa",
        categoria: "internacional",
        descricao: "História, arquitetura e gastronomia italiana.",
        preco: "R$ 6.490",
        imagem: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800"
    },

    {
        nome: "Santorini",
        regiao: "Europa",
        categoria: "internacional",
        descricao: "Casas brancas, mar azul e pores do sol incríveis.",
        preco: "R$ 7.290",
        imagem: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800"
    },

    {
        nome: "Tóquio",
        regiao: "Ásia",
        categoria: "internacional",
        descricao: "Tecnologia, tradição e cultura japonesa.",
        preco: "R$ 8.990",
        imagem: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800"
    },

    {
        nome: "Machu Picchu",
        regiao: "América do Sul",
        categoria: "internacional",
        descricao: "Uma viagem fascinante pela história dos Incas.",
        preco: "R$ 4.890",
        imagem: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800"
    },

    {
        nome: "Alpes Suíços",
        regiao: "Europa",
        categoria: "internacional",
        descricao: "Montanhas, neve e paisagens impressionantes.",
        preco: "R$ 8.490",
        imagem: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800"
    }

];


// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const containerDestinos = document.querySelector("#containerDestinos");
const pesquisa = document.querySelector("#pesquisa");
const filtroRegiao = document.querySelector("#filtroRegiao");
const mensagemVazia = document.querySelector("#mensagemVazia");


// ==========================================
// FUNÇÃO PARA MOSTRAR OS DESTINOS
// ==========================================

function mostrarDestinos(lista) {

    if (!containerDestinos) return;

    containerDestinos.innerHTML = "";

    lista.forEach(function(destino) {

        const card = document.createElement("article");
        card.classList.add("card");

        const imagem = document.createElement("img");

        imagem.src = destino.imagem;
        imagem.alt = destino.nome;
        imagem.loading = "lazy";

        // Imagem alternativa se a principal não carregar
        imagem.onerror = function() {
            this.onerror = null;
            this.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800";
        };

        const conteudo = document.createElement("div");
        conteudo.classList.add("card-conteudo");

        conteudo.innerHTML = `
            <span>${destino.regiao}</span>

            <h3>${destino.nome}</h3>

            <p>${destino.descricao}</p>

            <div class="card-rodape">
                <strong>A partir de ${destino.preco}</strong>

                <a href="cadastro.html">Consultar</a>
            </div>
        `;

        card.appendChild(imagem);
        card.appendChild(conteudo);

        containerDestinos.appendChild(card);

    });

    if (mensagemVazia) {
        mensagemVazia.style.display =
            lista.length === 0 ? "block" : "none";
    }

}


// ==========================================
// PESQUISA E FILTROS
// ==========================================

function filtrarDestinos() {

    const termo = pesquisa.value.toLowerCase();

    const regiao = filtroRegiao.value;

    const resultado = destinos.filter(function(destino) {

        const correspondeNome =
            destino.nome.toLowerCase().includes(termo);

        const correspondeRegiao =
            regiao === "todos" ||
            destino.categoria === regiao;

        return correspondeNome && correspondeRegiao;

    });

    mostrarDestinos(resultado);

}


// ==========================================
// EVENTOS DA PÁGINA DE DESTINOS
// ==========================================

if (containerDestinos) {

    pesquisa.addEventListener("input", filtrarDestinos);

    filtroRegiao.addEventListener("change", filtrarDestinos);

    mostrarDestinos(destinos);

}


// ==========================================
// FORMULÁRIO DE CADASTRO
// ==========================================

const formulario = document.querySelector("#formCadastro");

if (formulario) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const nome = document.querySelector("#nome").value;

        const destino = document.querySelector("#destino").value;

        const mensagem = document.querySelector("#mensagem");

        mensagem.textContent =
            "Olá, " + nome +
            "! Recebemos seu interesse em viajar para " +
            destino + ". Em breve entraremos em contato!";

        formulario.reset();

    });

}
