// Função para exibir permutações em paralelo para os alunos
async function exibirPermutacoesParalelo(alunos) {
  console.log("Permutações em paralelo:");
  
  // Mapeia os alunos para gerar as permutações em paralelo
  const permPromises = alunos.map(async (aluno, index) => {
  const leituras = aluno.leituras;
  const perm = permutar(leituras); // Obtém as permutações das leituras do aluno
  const permStr = perm.map((p) => p.join(", ")).join(" | "); // Converte as permutações em strings
  console.log(`Aluno ${index + 1}: ${permStr}`); // Exibe as permutações para o aluno
  });
  
  await Promise.all(permPromises); // Aguarda todas as permutações serem processadas
  }
  
  // Função para obter todas as permutações de um array
  function permutar(arr) {
  if (arr.length === 0) {
  return [[]]; // Caso base: array vazio, retorna um array vazio
  }
  
  const result = [];
  
  // Gera as permutações recursivamente
  for (let i = 0; i < arr.length; i++) {
  const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]; // Remove o elemento atual do array
  const restPerms = permutar(rest); // Obtém as permutações para o restante do array
  const perms = restPerms.map((perm) => [arr[i], ...perm]); // Adiciona o elemento removido a cada permutação obtida
  result.push(...perms); // Adiciona as permutações ao resultado
  }
  
  return result; // Retorna todas as permutações geradas
  }
  
  module.exports = { exibirPermutacoesParalelo };