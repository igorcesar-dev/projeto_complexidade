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
    console.log("Ordenando a lista de leituras...")
    return alunos;
  }

module.exports = { ordenarLeiturasPorAluno };
  