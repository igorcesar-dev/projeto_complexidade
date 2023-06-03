// ARQUIVO main.js

const { gerarDadosAlunos } = require('./gerar_dados');
const { exibirPermutacoesParalelo } = require('./permutacoes');
const { imprimirAlunos, imprimirLeiturasPorAluno } = require('./imprimir_leituras');
const { Borda } = require('./borda');

async function main() {
  try {
    // Gera os dados dos alunos
    const quantidadeAlunos = 10;
    const quantidadeLeituras = 10;
    const alunos = await gerarDadosAlunos(quantidadeAlunos, quantidadeLeituras);
    // Divide os alunos em duas bordas
    const borda1 = new Borda();
    const borda2 = new Borda();

    // Recebe as leituras dos alunos e as adiciona às bordas correspondentes
    const alunosBorda1 = alunos.slice(0, quantidadeAlunos / 2);
    const alunosBorda2 = alunos.slice(quantidadeAlunos / 2);

    alunosBorda1.forEach((aluno) => {
      borda1.receberLeitura(aluno.id, aluno.leituras);
    });

    alunosBorda2.forEach((aluno) => {
      borda2.receberLeitura(aluno.id, aluno.leituras);
    });

    // Ordena e transfere as leituras da borda1 para a nuvem
    borda1.transferirLeiturasParaNuvem();

    // Ordena e transfere as leituras da borda2 para a nuvem
    borda2.transferirLeiturasParaNuvem();

    // Imprime os alunos
    imprimirAlunos(alunos);

    // Imprime as leituras por aluno
    imprimirLeiturasPorAluno(alunos);

    // Exibe as permutações em paralelo
    await exibirPermutacoesParalelo(alunos);
  } catch (error) {
    console.error('Erro ao executar o projeto:', error);
  }
}

main();