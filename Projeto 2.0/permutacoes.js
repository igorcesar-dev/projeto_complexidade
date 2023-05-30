// Implementação básica de um observable
function Observable() {
    this.subscribers = [];
  
    this.subscribe = (callback) => {
      this.subscribers.push(callback);
    };
  
    this.next = (data) => {
      this.subscribers.forEach((callback) => callback(data));
    };
  }
  
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
  
  // Função que lista as permutações em paralelo de forma reativa
  function listarPermutacoesParalelo(alunos) {
    return new Promise((resolve) => {
      const permutacoesObservable = new Observable();
  
      permutacoesObservable.subscribe((permutacoes) => {
        resolve(permutacoes);
      });
  
      const permutacoes = listarPermutacoes(alunos);
      permutacoesObservable.next(permutacoes);
    });
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
  