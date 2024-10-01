const formulario = document.querySelector("form");
const Inome = document.querySelector(".nome");
const Iemail =  document.querySelector(".email");
const Isenha = document.querySelector(".senha");
const Itel = document.querySelector(".tel");

function cadastrar() {
    fetch("/echo/json",
        {
            headers: {
                'Accept': 'application/json',
                'Contenet-Type': 'application/jso'
            },
            method: "POST",
            body: JSON.stringify({a: 1, b: 2})
        })
        .then(function(res) { console.log(res) })
        .catch(function (res) { console.log(res) })
};

formulario.addEventListener('submit', function (event){
    event.preventDefault();

    const dados = {
        nome: Inome.value,
        email: Iemail.value,
        senha: Isenha.value,
        telefone: Itel.value,
    };
    console.log(dados)
});
