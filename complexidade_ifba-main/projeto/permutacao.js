// Função assíncrona para listar permutações
async function listarPermutacoes(alunos) {
    const n = alunos.length;
    const permutacoes = [];
  
    // Função auxiliar para trocar elementos de posição em um array
    const trocar = (array, i, j) => {
      const aux = array[i];
      array[i] = array[j];
      array[j] = aux;
    };
  
    // Função assíncrona que gera as permutações
    const gerarPermutacoes = async (array, indice) => {
      return new Promise((resolve) => {
        if (indice === n - 1) {
          permutacoes.push([...array]);
          resolve();
          return;
        }
  
        let i = indice;
        const gerarPermutacao = async () => {
          if (i < n) {
            trocar(array, indice, i);
            await gerarPermutacoes(array, indice + 1);
            trocar(array, indice, i);
            i++;
            await gerarPermutacao();
          } else {
            resolve();
          }
        };
  
        setTimeout(gerarPermutacao, 0);
      });
    };
  
    await gerarPermutacoes(alunos, 0);
  
    // Retorna a lista de permutações gerada
    return permutacoes;
  }
  
  module.exports = { listarPermutacoes };
  