const gerarDados = require("./gerar_dados_thread");
const imprimir = require("./imprimir_leituras_thread.js");
const ordenarLeituras = require("./ordenar_leituras_thread.js");
const { exibirPermutacoesParalelo } = require("./permutacao_thread.js");

async function main() {
  const str = "-";
  console.log(str.repeat(100));

  const alunos = await gerarDados.gerarDadosAlunos(10);

  const t1 = imprimir.imprimirAlunos(alunos);
  console.log(str.repeat(100));
  const t2 = imprimir.imprimirLeiturasPorAluno(alunos);
  console.log(str.repeat(100));
  const t3 = ordenarLeituras.ordenarLeiturasPorAluno(alunos);
  const t4 = imprimir.imprimirLeiturasPorAluno(alunos);

  const t5 = exibirPermutacoesParalelo(alunos);

  await Promise.all([t1, t2, t3, t4, t5]); // Espera a execução de todas as Promises (t1, t2, t3, t4 e t5)
  console.log(str.repeat(100));
}

main();
