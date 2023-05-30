// (d.3) Função para ordenar as leituras de cada aluno em ordem crescente - Complexidade O(n^3);
function ordenarLeiturasPorAluno(alunos) {
  // Função auxiliar para comparar horários
  const compararHorarios = (h1, h2) => {
    // Divide as strings de horário em horas e minutos
    const [h1Hora, h1Minuto] = h1.split(":");
    const [h2Hora, h2Minuto] = h2.split(":");

    // Compara as horas
    if (parseInt(h1Hora) < parseInt(h2Hora)) {
      return -1;
    } else if (parseInt(h1Hora) > parseInt(h2Hora)) {
      return 1;
    } else {
      // Compara os minutos se as horas forem iguais
      if (parseInt(h1Minuto) < parseInt(h2Minuto)) {
        return -1;
      } else if (parseInt(h1Minuto) > parseInt(h2Minuto)) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  // Percorre cada aluno na lista
  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];
    const leituras = aluno.leituras;

    // Algoritmo de ordenação bubble sort para as leituras do aluno
    for (let j = 0; j < leituras.length; j++) {
      for (let k = 0; k < leituras.length - 1 - j; k++) {
        // Compara os horários adjacentes e realiza a troca se necessário
        if (compararHorarios(leituras[k], leituras[k + 1]) > 0) {
          const aux = leituras[k];
          leituras[k] = leituras[k + 1];
          leituras[k + 1] = aux;
        }
      }
    }

    // Atualiza as leituras ordenadas do aluno
    aluno.leituras = leituras;
  }

  console.log("Ordenando a lista de leituras...");

  // Retorna a lista de alunos com as leituras ordenadas
  return alunos;
}

// Exporta a função para uso em outros módulos
module.exports = { ordenarLeiturasPorAluno };
