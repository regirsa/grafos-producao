const operacoes = [
  { id: 10, nome: "Primeira face", anterior: null, concluida: false },
  { id: 20, nome: "Segunda face", anterior: 10, concluida: false },
  { id: 30, nome: "Inspeção", anterior: 20, concluida: false }
];

function atualizarTela() {
  const area = document.getElementById("operacoes");
  area.replaceChildren();

  for (const operacao of operacoes) {
    const anterior = operacoes.find(
      item => item.id === operacao.anterior
    );

    const liberada =
      operacao.anterior === null || anterior?.concluida === true;

    const caixa = document.createElement("section");
    const titulo = document.createElement("h2");
    const status = document.createElement("p");
    const botao = document.createElement("button");

    titulo.textContent = operacao.id + " — " + operacao.nome;

    if (operacao.concluida) {
      status.textContent = "Concluída";
    } else if (liberada) {
      status.textContent = "Liberada para começar";
    } else {
      status.textContent = "Aguarda a operação " + operacao.anterior;
    }

    botao.textContent = "Concluir operação";
    botao.disabled = !liberada || operacao.concluida;

    botao.addEventListener("click", function () {
      operacao.concluida = true;
      atualizarTela();
    });

    caixa.append(titulo, status, botao);
    area.appendChild(caixa);
  }
}

atualizarTela();
