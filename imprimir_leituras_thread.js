// (d.2) Função para imprimir a lista de alunos
function imprimirAlunos(alunos) {
  console.log("Lista de alunos:");
  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];
    console.log(`- Aluno - ID:${aluno.id}`);
  }
}

// (d.3) Função para imprimir a lista de leituras por aluno
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
    console.log(`- Aluno - ID:${aluno.id}: ${leituras}`);
  }
}

module.exports = { imprimirAlunos, imprimirLeiturasPorAluno };

