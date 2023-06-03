// ARQUIVO permutacoes.js

async function exibirPermutacoesParalelo(alunos) {
  console.log("Permutações em paralelo:");

  const permPromises = alunos.map(async (aluno, index) => {
    const leituras = aluno.leituras;
    const perm = permutar(leituras);
    const permStr = perm.map((p) => p.join(", ")).join(" | ");
    console.log(`Aluno ${index + 1}: ${permStr}`);
  });

  await Promise.all(permPromises);
}

function permutar(arr) {
  if (arr.length === 0) {
    return [[]];
  }

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const restPerms = permutar(rest);
    const perms = restPerms.map((perm) => [arr[i], ...perm]);
    result.push(...perms);
  }

  return result;
}

module.exports = { exibirPermutacoesParalelo };