// Função para gerar dados randômicos para n alunos - Complexidade O(n^2);
async function gerarDadosAlunos(n) {
  const alunos = [];

  // Função para gerar leituras de forma assíncrona
  async function gerarLeituras() {
    const leituras = [];
    for (let j = 1; j <= 10; j++) {
      leituras.push(await gerarHorario());
    }
    return leituras;
  }

  // Função para gerar horário aleatório no formato "hh:mm" - Complexidade O(1);
  function gerarHorario() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const hora = Math.floor(Math.random() * 24);
        const minuto = Math.floor(Math.random() * 60);
        resolve(`${hora.toString().padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`);
      }, Math.random() * 1000);
    });
  }

  // Gerar dados para cada aluno
  for (let i = 1; i <= n; i++) {
    const leituras = await gerarLeituras();
    alunos.push({ id: i, leituras });
  }

  return alunos;
}

module.exports = { gerarDadosAlunos };
