import Notas from "../Modelo/notas.js";

export default class NotasCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpfAluno = dados.cpfAluno;
            const nomeAluno = dados.nomeAluno;
            const disciplina = dados.disciplina;
            const dataAvaliacao = dados.dataAvaliacao;
            const valorNota = dados.valorNota;

            if (cpfAluno && nomeAluno && disciplina && dataAvaliacao && valorNota) {
                const nota = new Notas(cpfAluno, nomeAluno, disciplina, dataAvaliacao, valorNota);

                nota.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "CPF Aluno": nota.cpfAluno,
                        "mensagem": "Nota incluída com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar nota: " + erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados das notas segundo documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um produto!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' ||
        requisicao.method === 'PATCH') && 
        requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpfAluno = dados.cpfAluno;
            const nomeAluno = dados.nomeAluno;
            const disciplina = dados.disciplina;
            const dataAvaliacao = dados.dataAvaliacao;
            const valorNota = dados.valorNota;
            if (cpfAluno && nomeAluno && disciplina && dataAvaliacao && valorNota) {
                const nota = new Notas(cpfAluno, nomeAluno, disciplina, dataAvaliacao, valorNota);

                nota.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Nota atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o produto: "+erro.message
                        });
                    });

            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados da nota sedundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false, 
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um produto!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && 
        requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpfAluno = dados.cpfAluno;
            if (cpfAluno) {
                const nota = new Notas(cpfAluno);

                nota.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Nota excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a nota:"+erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o CPF do Aluno!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma nota!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const nota = new Notas();
            nota.consultar(termo).then((listaNotas) => {
                resposta.json({
                    status: true,
                    listaNotas
                });
            })
                .catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível obter as notas: " +erro.message
                    });
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar as notas!"
            });
        }
    }
}