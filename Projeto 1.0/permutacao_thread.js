const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

// Função que gera todas as permutações dos alunos
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
      permutacoes.push([...array]); // Adiciona a permutação encontrada ao array de permutações
      return;
    }

    for (let i = indice; i < n; i++) {
      trocar(array, indice, i); // Troca os elementos de posição
      gerarPermutacoes(array, indice + 1); // Chama recursivamente para gerar as permutações restantes
      trocar(array, indice, i); // Desfaz a troca para voltar à configuração original
    }
  };

  gerarPermutacoes(alunos, 0); // Inicia o processo de geração de permutações com o índice inicial 0

  return permutacoes; // Retorna o array de permutações
}

// Função que lista as permutações em paralelo usando workers
function listarPermutacoesParalelo(alunos) {
  return new Promise((resolve, reject) => {
    if (isMainThread) {
      const worker = new Worker(__filename, { workerData: alunos });

      // Evento que é acionado quando o worker envia uma mensagem de retorno
      worker.on("message", (permutacoes) => {
        resolve(permutacoes); // Resolve a Promise com as permutações recebidas do worker
      });

      // Evento que é acionado se ocorrer um erro no worker
      worker.on("error", (error) => {
        reject(error); // Rejeita a Promise com o erro recebido do worker
      });
    } else {
      const permutacoes = listarPermutacoes(workerData); // Gera as permutações usando a função listarPermutacoes
      parentPort.postMessage(permutacoes); // Envia as permutações para o thread pai
    }
  });
}

// Trecho de código que é executado se o arquivo não está sendo executado como o thread principal
if (!isMainThread) {
  const permutacoes = listarPermutacoes(workerData); // Gera as permutações usando a função listarPermutacoes
  parentPort.postMessage(permutacoes); // Envia as permutações para o thread pai
}

// Função assíncrona que exibe as permutações em paralelo
async function exibirPermutacoesParalelo(alunos) {
  try {
    const permutacoes = await listarPermutacoesParalelo(alunos); // Aguarda a obtenção das permutações usando a função listarPermutacoesParalelo
    console.log(`Lista de permutações (${permutacoes.length}):`);
    for (let i = 0; i < permutacoes.length; i++) {
      console.log(
        `- Permutação ${i + 1}: ${permutacoes[i]
          .map((aluno) => aluno.id)
          .join(", ")}`
      ); // Exibe o número da permutação e os IDs dos alunos que a compõem
    }
  } catch (error) {
    console.error("Erro ao listar permutações:", error); // Exibe uma mensagem de erro, caso ocorra algum problema na obtenção das permutações
  }
}

module.exports = { exibirPermutacoesParalelo }; // Exporta a função exibirPermutacoesParalelo para uso em outros arquivos
