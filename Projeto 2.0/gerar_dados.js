// Classe Observador para notificar os assinantes
class Observador {
  constructor() {
    this.assinantes = [];
  }

  assinar(callback) {
    this.assinantes.push(callback);
  }

  notificar(dado) {
    this.assinantes.forEach((callback) => {
      callback(dado);
    });
  }
}

// Função para gerar dados randômicos de leituras
async function gerarLeituras() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const hora = Math.floor(Math.random() * 24);
      const minuto = Math.floor(Math.random() * 60);
      if (hora >= 0 && hora < 24 && minuto >= 0 && minuto < 60) {
        resolve(`${hora.toString().padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`);
      } else {
        reject(new Error("Horário inválido gerado."));
      }
    }, Math.random() * 1000);
  });
}

// Função para gerar dados de um aluno
async function gerarDadosAluno(id, quantidadeLeituras) {
  const observador = new Observador();
  const leituras = [];

  observador.assinar((leitura) => {
    leituras.push(leitura);
  });

  for (let j = 1; j <= quantidadeLeituras; j++) {
    const leitura = await gerarLeituras();
    observador.notificar(leitura);
  }

  return { id: id, leituras: leituras };
}

// Função para gerar dados randômicos para n alunos
async function gerarDadosAlunos(n, quantidadeLeituras) {
  const alunos = [];

  for (let i = 1; i <= n; i++) {
    const aluno = await gerarDadosAluno(i, quantidadeLeituras);
    alunos.push(aluno);
  }

  return alunos;
}

module.exports = { gerarDadosAlunos };