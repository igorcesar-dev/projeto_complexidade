// Classe Borda representa uma borda de transferência de dados
class Borda {
    constructor() {
        this.leituras = []; // Array para armazenar as leituras
    }

    // Método para receber as leituras de um aluno e adicioná-las à borda
    receberLeitura(alunoId, leituras) {
        this.leituras.push(...leituras.map((leitura) => ({ alunoId, leitura })));
    }

    // Método para ordenar as leituras em ordem crescente de horário
    ordenarLeituras() {
        this.leituras.sort((a, b) => {
            const [h1Hora, h1Minuto] = a.leitura.split(":");
            const [h2Hora, h2Minuto] = b.leitura.split(":");
            if (parseInt(h1Hora) < parseInt(h2Hora)) {
                return -1;
            } else if (parseInt(h1Hora) > parseInt(h2Hora)) {
                return 1;
            } else {
                if (parseInt(h1Minuto) < parseInt(h2Minuto)) {
                    return -1;
                } else if (parseInt(h1Minuto) > parseInt(h2Minuto)) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
    }

    // Método para transferir as leituras para a nuvem
    transferirLeiturasParaNuvem() {
        this.ordenarLeituras();
        console.log("Transferindo leituras para a nuvem:");
        this.leituras.forEach((leitura, index) => {
            console.log(`Leitura ${index + 1}: Aluno ${leitura.alunoId}, Horário ${leitura.leitura}`);
        });
        console.log("Transferência concluída.");
    }
}

module.exports = { Borda };