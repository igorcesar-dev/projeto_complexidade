// (d.4) Função listarPermutacoes recebe como argumento um array de objetos "alunos" e imprime no console a lista de todas as permutações possíveis dos alunos - Complexidade O(n!)

/* 
É possível que o algoritmo d.4 gere alguma situação de necessidade de processamento via brute force (força bruta), principalmente quando o tamanho do array de entrada alunos é muito grande. 

A complexidade do algoritmo é O(n!) (fatorial), o que significa que, para um conjunto com 10 elementos, o algoritmo precisará gerar 3.628.800 permutações. É importante considerar o tamanho do conjunto de entrada antes de utilizar este algoritmo e avaliar se é realmente necessário gerar todas as permutações possíveis.
*/

function listarPermutacoes(alunos) {
  const n = alunos.length; // Armazena o tamanho do array de alunos em uma constante n
  const permutacoes = []; // Cria um array vazio para armazenar as permutações

  // Função auxiliar para trocar elementos de posição em um array
  const trocar = (array, i, j) => {
    const aux = array[i];
    array[i] = array[j];
    array[j] = aux;
  };

  // Função recursiva para gerar as permutações
  const gerarPermutacoes = (array, indice) => {
    if (indice === n - 1) {
      // Se o índice for igual ao último índice possível, a permutação atual é completa e deve ser adicionada ao array de permutações
      permutacoes.push([...array]);
      return;
    }

    // Laço que percorre todos os elementos após o índice atual e os troca de posição com o elemento no índice atual para gerar novas permutações
    for (let i = indice; i < n; i++) {
      trocar(array, indice, i);
      gerarPermutacoes(array, indice + 1);
      trocar(array, indice, i); // Troca novamente os elementos para desfazer a mudança e voltar ao estado original do array
    }
  };

  // Chama a função gerarPermutacoes com o array de alunos e o índice inicial como argumentos
  gerarPermutacoes(alunos, 0);

  // Imprime no console a lista de permutações gerada, informando o número total de permutações e listando cada uma com o índice e os ids dos alunos
  console.log(`Lista de permutações (${permutacoes.length}):`);
  for (let i = 0; i < permutacoes.length; i++) {
    console.log(
      `- Permutação ${i + 1}: ${permutacoes[i]
        .map((aluno) => aluno.id)
        .join(", ")}`
    );
  }
}

module.exports = { listarPermutacoes };
