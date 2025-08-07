let participantes = [];

function adicionarParticipante() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    if (nome == "") {
        alert("Digite um nome válido!");
        return;
    }

    if (participantes.includes(nome)) {
        alert("Este nome já foi adicionado.");
        return;
    }

    participantes.push(nome);
    console.log (participantes)
    input.value = "";

    atualizarLista();
}

function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    participantes.forEach((nome, index) => {
        const li = document.createElement("li");
        li.innerText = `${index + 1}. ${nome}`;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (participantes.length < 3) {
        alert("Adicione pelo menos 3 participantes para realizar o sorteio.");
        return;
    }

    const sorteio = realizarSorteio([...participantes]);

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<h3>Resultado do Amigo Secreto:</h3>";

    for (let i = 0; i < participantes.length; i++) {
        const paragrafo = document.createElement("p");
        paragrafo.innerText = `${participantes[i]} tirou ${sorteio[participantes[i]]}`;
        resultadoDiv.appendChild(paragrafo);
    }
}

function realizarSorteio(lista) {
    const copia = [...lista];
    let sorteados = {};

    for (let i = 0; i < lista.length; i++) {
        let disponiveis = copia.filter(nome => nome !== lista[i]);

        if (disponiveis.length === 0) {
            return realizarSorteio(lista); // reinicia sorteio se não for possível
        }

        const sorteado = disponiveis[Math.floor(Math.random() * disponiveis.length)];
        sorteados[lista[i]] = sorteado;

        // remove sorteado da cópia
        const index = copia.indexOf(sorteado);
        copia.splice(index, 1);
    }

    return sorteados;
}

function reiniciar() {
    participantes = [];
    document.getElementById("nome").value = "";
    document.getElementById("listaParticipantes").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}
