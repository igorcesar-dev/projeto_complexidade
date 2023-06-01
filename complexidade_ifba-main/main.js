// (A) Função para gerar dados randômicos para n alunos - Complexidade O(n^2);
function gerarDadosAlunos(n) {
  const alunos = [];
  for (let i = 1; i <= n; i++) {
    const leituras = [];
    for (let j = 1; j <= 10; j++) {
      leituras.push(gerarHorario());
    }
    alunos.push({ id: i, leituras });
  }
  return alunos;
}

// Função para gerar horário aleatório no formato "hh:mm" - Complexidade O(1);
function gerarHorario() {
  const hora = Math.floor(Math.random() * 24);
  const minuto = Math.floor(Math.random() * 60);
  return `${hora.toString().padStart(2, "0")}:${minuto
    .toString()
    .padStart(2, "0")}`;
}

// (d.1) Função para imprimir a lista de alunos - Complexidade O(n);
function imprimirAlunos(alunos) {
  console.log("Lista de alunos:");
  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];
    console.log(`- Aluno - ID:${aluno.id}`);
  }
}

// (d.2) Função para imprimir a lista de leituras por aluno - Complexidade O(n^2);
function imprimirLeiturasPorAluno(alunos) {
  console.log("Lista de leituras por aluno:");
  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];
    let leituras = "";
    for (let j = 0; j < aluno.leituras.length; j++) {
      leituras += aluno.leituras[j];
      if (j !== aluno.leituras.length - 1) {
        leituras += ", ";
      }
    }
    console.log(`- Aluno - Id:${aluno.id}: ${leituras}`);
  }
}

// (d.3) Função para ordenar as leituras de cada aluno em ordem crescente - Complexidade O(n^3);
function ordenarLeiturasPorAluno(alunos) {
  const compararHorarios = (h1, h2) => {
    const [h1Hora, h1Minuto] = h1.split(":");
    const [h2Hora, h2Minuto] = h2.split(":");
    if (parseInt(h1Hora) < parseInt(h2Hora)) {
      return -1;
    } else if (parseInt(h1Hora) > parseInt(h2Hora)) {
      return 1;
    } else {
      if (parseInt(h1Minuto) < parseInt(h2Minuto)) {
        return -1;
      } else if (parseInt(h1Minuto) > parseInt(h2Minuto)) {
        return 1;
      } else {
        return 0;
      }
    }
  };
 
  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];
    const leituras = aluno.leituras;
    for (let j = 0; j < leituras.length; j++) {
      for (let k = 0; k < leituras.length - 1 - j; k++) {
        if (compararHorarios(leituras[k], leituras[k + 1]) > 0) {
          const aux = leituras[k];
          leituras[k] = leituras[k + 1];
          leituras[k + 1] = aux;
        }
      }
    }
    aluno.leituras = leituras;
  }

  return alunos;
}

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
    if (indice === n - 1) {// Se o índice for igual ao último índice possível, a permutação atual é completa e deve ser adicionada ao array de permutações
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
    console.log(`- Permutação ${i + 1}: ${permutacoes[i].map(aluno => aluno.id).join(", ")}`);
  }
}

// (C) Função MAIN;
function main() {
  //Gera os hífens de divisão
  var str = "-";
  console.log(str.repeat(100));

  // Gerar 10 dados de alunos
  const alunos = gerarDadosAlunos(10);

  // Imprimir lista de alunos
  imprimirAlunos(alunos);
  console.log(str.repeat(100));

  // Imprimir lista de leituras por aluno
  imprimirLeiturasPorAluno(alunos);
  console.log(str.repeat(100));

  // Ordenar leituras de cada aluno em ordem crescente
  ordenarLeiturasPorAluno(alunos);
  console.log("Lista de leituras por aluno ordenada:");

  imprimirLeiturasPorAluno(alunos);
  console.log(str.repeat(100));

  //Chama a função d.4
  listarPermutacoes(alunos);
}

// Executar função principal
main();
