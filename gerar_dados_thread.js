function gerarDadosAluno(id) {
  let leituras = []; // Cria lista vazia chamada leituras;
  return new Promise((resolve, reject) => {
    // Cria uma nova Promise para executar a função assíncrona
    for (let j = 1; j <= 10; j++) {
      // Loop for para criar um dicionário que contém o ID do aluno e a lista de leituras;
      leitura_sensor(leituras); // Executa a função de leitura de sensor
    }
    resolve({ id: id, leituras: leituras }); // Resolve a Promise com os dados do aluno gerados
  });
}

function leitura_sensor(leituras) {
  //Função para adicionar leitura de hora e minuto na lista de leituras;
  let hora = String(Math.floor(Math.random() * 24)).padStart(2, "0");
  let minuto = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  leituras.push(`${hora}:${minuto}`);
}

async function gerarDadosAlunos(n) {
  // Função assíncrona para gerar dados dos alunos
  let alunos = [];
  for (let i = 1; i <= n; i++) {
    let aluno = await gerarDadosAluno(i); // Aguarda a Promise da função gerarDadosAluno
    alunos.push(aluno); // Adiciona o objeto aluno à lista de alunos
  }
  return alunos;
}

module.exports = {
  gerarDadosAluno,
  gerarDadosAlunos,
  leitura_sensor,
};
