
// Função para imprimir os dados dos alunos
function imprimirAlunos(alunos) {
  console.log("Alunos:");

  // Itera sobre cada aluno e imprime suas informações
  alunos.forEach((aluno) => {
    console.log(`Aluno ${aluno.id}:`);
    console.log(aluno.leituras);
  });
}

// Função para imprimir as leituras por aluno
function imprimirLeiturasPorAluno(alunos) {
  console.log("Leituras por aluno:");

  // Itera sobre cada aluno e suas leituras e imprime as informações
  alunos.forEach((aluno) => {
    console.log(`Aluno ${aluno.id}:`);
    aluno.leituras.forEach((leitura, index) => {
      console.log(`Leitura ${index + 1}: ${leitura}`);
    });
  });
}

module.exports = { imprimirAlunos, imprimirLeiturasPorAluno };