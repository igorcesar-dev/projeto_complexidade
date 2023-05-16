const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

function listarPermutacoes(alunos) {
  const n = alunos.length;
  const permutacoes = [];

  const trocar = (array, i, j) => {
    const aux = array[i];
    array[i] = array[j];
    array[j] = aux;
  };

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

  gerarPermutacoes(alunos, 0);

  return permutacoes;
}

function listarPermutacoesParalelo(alunos) {
  return new Promise((resolve, reject) => {
    if (isMainThread) {
      const worker = new Worker(__filename, { workerData: alunos });

      worker.on("message", (permutacoes) => {
        resolve(permutacoes);
      });

      worker.on("error", (error) => {
        reject(error);
      });
    } else {
      const permutacoes = listarPermutacoes(workerData);
      parentPort.postMessage(permutacoes);
    }
  });
}

if (!isMainThread) {
  const permutacoes = listarPermutacoes(workerData);
  parentPort.postMessage(permutacoes);
}

function exibirPermutacoesParalelo(alunos){
  // Utilizando a função listarPermutacoesParalelo de forma assíncrona
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

module.exports = { exibirPermutacoesParalelo };
