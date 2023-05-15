// Importa as funções dos arquivos "gerar_dados_thread.js", "imprimir_leituras_thread.js",
// "ordenar_leituras_thread.js" e "permutacao_thread.js"
const gerarDados = require("./gerar_dados_thread");
const imprimir = require("./imprimir_leituras_thread.js");
const ordenarLeituras = require("./ordenar_leituras_thread.js");
const listarPermutacoes = require ("./permutacao_thread.js");

// Define a função principal assíncrona "main"
async function main() {
  const str = "-"; 
  console.log(str.repeat(100)); // Imprime 100 traços para separar as saídas no console

  const alunos = await gerarDados.gerarDadosAlunos(10); // Chama a função "gerarDadosAlunos" do arquivo "gerar_dados_thread.js" para gerar uma lista de 10 alunos

  const t1 = imprimir.imprimirAlunos(alunos); // Chama a função "imprimirAlunos" do arquivo "imprimir_leituras_thread.js" para imprimir a lista de alunos
  console.log(str.repeat(100));
  const t2 = imprimir.imprimirLeiturasPorAluno(alunos); // Chama a função "imprimirLeiturasPorAluno" do arquivo "imprimir_leituras_thread.js" para imprimir as leituras de cada aluno
  console.log(str.repeat(100));
  const t3 = ordenarLeituras.ordenarLeiturasPorAluno(alunos); // Chama a função "ordenarLeiturasPorAluno" do arquivo "ordenar_leituras_thread.js" para ordenar as leituras de cada aluno
  const t4 = imprimir.imprimirLeiturasPorAluno(alunos); // Chama a função "imprimirLeiturasPorAluno" novamente para imprimir as leituras ordenadas
  console.log(str.repeat(100));
  const t5 = listarPermutacoes.listarPermutacoes(alunos); // Chama a função "listarPermutacoes" do arquivo "permutacao_thread.js" para gerar uma lista de todas as permutações dos alunos

  await Promise.all([t1, t2, t3, t4, t5]); // Espera a execução de todas as Promises (t1, t2, t3, t4 e t5)

  console.log(str.repeat(100));
}

main(); // Chama a função "main" para executar o programa
