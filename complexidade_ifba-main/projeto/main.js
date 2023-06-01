const { gerarDadosAlunos } = require('./gerar_dados');
const { ordenarLeiturasPorAluno } = require('./ordenar_leituras');
const { listarPermutacoes } = require('./permutacao');
const { imprimirAlunos, imprimirLeiturasPorAluno } = require('./imprimir_leituras');

async function main() {
    // Gerar dados dos alunos
    console.log('Gerando dados dos alunos...');
    const alunos = await gerarDadosAlunos(5);
  
    // Imprimir lista de alunos
    imprimirAlunos(alunos);
  
   /*  // Ordenar leituras por aluno
    console.log('Ordenando as leituras dos alunos...');
    const alunosOrdenados = ordenarLeiturasPorAluno(alunos);
  
    // Imprimir lista de leituras por aluno
    imprimirLeiturasPorAluno(alunosOrdenados);
  
    // Listar permutações
    console.log('Listando permutações...');
    const permutacoes = await listarPermutacoes(alunosOrdenados);
  
    // Imprimir permutações
    console.log('Permutações:');
    console.log(permutacoes); */
  }
  
  // Executar a função main
  main();
  