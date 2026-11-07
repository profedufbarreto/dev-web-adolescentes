const formulario = document.querySelector("formCadastro");

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    const nome = document.querySelector("#nome").value;
    const destino = document.querySelector("#destino").value;

    const mensagem = document.querySelector("#mensagem");

    mensagem.textContent = 
        `Olá, ${nome}! Sua próxima aventura será em ${destino}!`;

    formulario.reset();

});