const gerarDados = require("./gerar_dados_thread");
const imprimir = require("./imprimir_leituras_thread.js");
const ordenarLeituras = require("./ordenar_leituras_thread.js");
const { exibirPermutacoesParalelo } = require("./permutacao_thread.js");

// Função principal assíncrona
async function main() {
  const str = "-";
  console.log(str.repeat(100));

  // Gerar dados dos alunos de forma assíncrona
  const alunos = await gerarDados.gerarDadosAlunos(10);

  // Imprimir lista de alunos
  imprimir.imprimirAlunos(alunos);
  console.log(str.repeat(100));

  // Imprimir lista de leituras por aluno
  imprimir.imprimirLeiturasPorAluno(alunos);
  console.log(str.repeat(100));

  // Ordenar leituras de cada aluno em ordem crescente
  ordenarLeituras.ordenarLeiturasPorAluno(alunos);

  // Imprimir lista de leituras ordenadas por aluno
  imprimir.imprimirLeiturasPorAluno(alunos);

  // Exibir permutações paralelamente
  await exibirPermutacoesParalelo(alunos);

  console.log(str.repeat(100));
}

// Chama a função principal
main();
