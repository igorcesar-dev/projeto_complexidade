const { Worker, isMainThread, parentPort } = require("worker_threads");

// Função para gerar uma leitura de sensor simulada
function leitura_sensor() {
  // Gera valores aleatórios para hora e minuto
  let hora = String(Math.floor(Math.random() * 24)).padStart(2, "0");
  let minuto = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  return `${hora}:${minuto}`;
}

// Função assíncrona para gerar os dados de um aluno
function gerarDadosAluno(id) {
  return new Promise((resolve, reject) => {
    const leituras = [];

    // Cria um novo worker
    const worker = new Worker(__filename);

    // Evento para receber mensagens do worker
    worker.on("message", (leitura) => {
      leituras.push(leitura);
    });

    // Evento para tratar erros no worker
    worker.on("error", (error) => {
      reject(error);
    });

    // Evento para finalização do worker
    worker.on("exit", () => {
      // Resolve a Promise com os dados do aluno
      resolve({ id: id, leituras: leituras });
    });

    // Função para executar uma leitura
    function executarLeitura() {
      const leitura = leitura_sensor();
      parentPort.postMessage(leitura);
    }

    // Verifica se está na thread principal
    if (isMainThread) {
      // Gera 10 leituras para o aluno usando o worker
      for (let j = 1; j <= 10; j++) {
        worker.postMessage({ action: "executarLeitura" });
      }
    } else {
      // Evento para receber mensagens na thread do worker
      parentPort.on("message", (message) => {
        if (message.action === "executarLeitura") {
          executarLeitura();
        }
      });
    }
  });
}

// Função assíncrona para gerar os dados de vários alunos
async function gerarDadosAlunos(n) {
  const alunos = [];

  for (let i = 1; i <= n; i++) {
    // Chama a função para gerar os dados de um aluno
    const aluno = await gerarDadosAluno(i);
    alunos.push(aluno);
  }

  return alunos;
}

// Exporta as funções para uso em outros módulos
module.exports = {
  gerarDadosAluno,
  gerarDadosAlunos,
};
