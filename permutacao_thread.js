const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

// Função para listar todas as permutações possíveis de uma lista de alunos
function listarPermutacoes(alunos) {
  const n = alunos.length;
  const permutacoes = [];

  // Função auxiliar para trocar elementos de posição em um array
  const trocar = (array, i, j) => {
    const aux = array[i];
    array[i] = array[j];
    array[j] = aux;
  };

  // Função recursiva para gerar as permutações
  const gerarPermutacoes = (array, indice) => {
    if (indice === n - 1) {
      permutacoes.push([...array]);
      return;
    }

    for (let i = indice; i < n; i++) {
      trocar(array, indice, i);
      gerarPermutacoes(array, indice + 1);
      trocar(array, indice, i);
    }
  };

  // Inicia a geração das permutações
  gerarPermutacoes(alunos, 0);

  return permutacoes;
}

// Função para listar as permutações em paralelo usando threads
function listarPermutacoesParalelo(alunos) {
  return new Promise((resolve, reject) => {
    if (isMainThread) {
      const worker = new Worker(__filename, { workerData: alunos });

      const permutacoes = [];

      // Recebe as permutações geradas por cada thread
      worker.on("message", (permutacao) => {
        permutacoes.push(permutacao);
      });

      worker.on("error", (error) => {
        reject(error);
      });

      // Ao finalizar as threads, resolve a promessa com as permutações completas
      worker.on("exit", () => {
        resolve(permutacoes);
      });

      // Inicia a geração das permutações nas threads
      worker.postMessage({ action: "gerarPermutacoes" });
    } else {
      // Se não estiver na thread principal, gera as permutações e envia para a thread principal
      const permutacoes = listarPermutacoes(workerData);
      for (let i = 0; i < permutacoes.length; i++) {
        parentPort.postMessage(permutacoes[i]);
      }
    }
  });
}

// Manipula as mensagens recebidas pela thread
if (!isMainThread) {
  parentPort.on("message", (message) => {
    if (message.action === "gerarPermutacoes") {
      const permutacoes = listarPermutacoes(workerData);
      for (let i = 0; i < permutacoes.length; i++) {
        parentPort.postMessage(permutacoes[i]);
      }
    }
  });
}

// Função para exibir as permutações em paralelo
function exibirPermutacoesParalelo(alunos) {
  listarPermutacoesParalelo(alunos)
    .then((permutacoes) => {
      console.log(`Lista de permutações (${permutacoes.length}):`);
      for (let i = 0; i < permutacoes.length; i++) {
        console.log(
          `- Permutação ${i + 1}: ${permutacoes[i]
            .map((aluno) => aluno.id)
            .join(", ")}`
        );
      }
    })
    .catch((error) => {
      console.error("Erro ao listar permutações:", error);
    });
}

// Exporta a função para uso em outros módulos
module.exports = { exibirPermutacoesParalelo };
