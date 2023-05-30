// Importa as funções dos módulos
const { gerarDadosAlunos } = require('./gerar_dados');
const { exibirPermutacoesParalelo } = require('./permutacoes');
const { imprimirAlunos, imprimirLeiturasPorAluno } = require('./imprimir_leituras');
const { ordenarLeiturasPorAluno } = require('./ordenar_leituras');

// Função principal que executa o projeto completo
async function main() {
  try {
    // Gera os dados dos alunos
    const alunos = await gerarDadosAlunos(10);
    
    // Imprime os alunos
    imprimirAlunos(alunos);
    
    // Imprime as leituras por aluno
    imprimirLeiturasPorAluno(alunos);
    
    // Ordena as leituras por aluno
    ordenarLeiturasPorAluno(alunos);
    
    // Exibe as permutações em paralelo
    await exibirPermutacoesParalelo(alunos);
  } catch (error) {
    console.error('Erro ao executar o projeto:', error);
  }
}

// Chama a função principal
main();
