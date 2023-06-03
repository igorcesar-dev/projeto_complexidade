// ARQUIVO imprimir_leituras.js

function imprimirAlunos(alunos) {
  console.log("Alunos:");
  alunos.forEach((aluno) => {
    console.log(`Aluno ${ aluno.id }: `);
    console.log(aluno.leituras);
  });
}

function imprimirLeiturasPorAluno(alunos) {
  console.log("Leituras por aluno:");
  alunos.forEach((aluno) => {
    console.log(`Aluno ${ aluno.id }: `);
    aluno.leituras.forEach((leitura, index) => {
      console.log(`Leitura ${ index + 1}: ${ leitura }`);
  });
});
  }

module.exports = { imprimirAlunos, imprimirLeiturasPorAluno };