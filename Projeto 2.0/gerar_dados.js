// Função para gerar dados randômicos para n alunos
async function gerarDadosAlunos(n) {
  const alunos = [];

  // Classe Observador para notificar os assinantes
  class Observador {
    constructor() {
      this.assinantes = []; // Array para armazenar os callbacks dos assinantes
    }

    // Método para assinar um callback como assinante
    assinar(callback) {
      this.assinantes.push(callback);
    }

    // Método para notificar os assinantes com um dado
    notificar(dado) {
      this.assinantes.forEach((callback) => {
        callback(dado);
      });
    }
  }

  // Função para gerar horário aleatório no formato "hh:mm"
  function gerarHorario() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const hora = Math.floor(Math.random() * 24);
        const minuto = Math.floor(Math.random() * 60);

        // Verifica se o horário gerado é válido
        if (hora >= 0 && hora < 24 && minuto >= 0 && minuto < 60) {
          resolve(`${hora.toString().padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`);
        } else {
          reject(new Error("Horário inválido gerado."));
        }
      }, Math.random() * 1000);
    });
  }

  // Função para gerar dados de um aluno
  async function gerarDadosAluno(id) {
    const observador = new Observador(); // Cria uma instância da classe Observador para cada aluno
    const leituras = []; // Array para armazenar as leituras do aluno

    // Assina o observador para receber notificações de leituras
    observador.assinar((leitura) => {
      leituras.push(leitura);
    });

    try {
      // Gerar 10 leituras de forma assíncrona
      for (let j = 1; j <= 10; j++) {
        const leitura = await gerarHorario(); // Aguarda a geração assíncrona do horário
        observador.notificar(leitura); // Notifica o observador com a leitura gerada
      }
    } catch (error) {
      console.error("Erro ao gerar leituras:", error);
    }

    return { id: id, leituras: leituras }; // Retorna um objeto contendo o ID do aluno e suas leituras
  }

  try {
    // Gerar dados para cada aluno
    for (let i = 1; i <= n; i++) {
      const aluno = await gerarDadosAluno(i); // Aguarda a geração assíncrona dos dados do aluno
      alunos.push(aluno); // Adiciona o aluno ao array de alunos
    }
  } catch (error) {
    console.error("Erro ao gerar dados dos alunos:", error);
  }

  return alunos; // Retorna o array de alunos gerados
}

module.exports = { gerarDadosAlunos }; // Exporta a função gerarDadosAlunos como um módulo
