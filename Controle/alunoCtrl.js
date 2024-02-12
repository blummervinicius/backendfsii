import Aluno from "../Modelo/aluno.js";

export default class AlunoCtrl {

    gravar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            if (cpf && nome){
                const aluno = new Aluno(cpf, nome);

                aluno.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "cpfGravado": aluno.cpf,
                        "mensagem": "Aluno incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar Aluno:" + erro.message
                        });
                    });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o nome do Aluno!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar o Aluno!"
            });
        }
    }

    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') &&
        requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            if (cpf && nome) {
                const aluno = new Aluno(cpf, nome);

                aluno.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Aluno atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar aluno:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o cpf e o nome do aluno!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um aluno!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if (cpf) {
                const aluno = new Aluno(cpf);

                aluno.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Aluno excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o aluno:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o CPF do aluno!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o metodo DELETE para excluir um aluno!"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type('application/json');

        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const aluno = new Aluno();
            aluno.consultar(termo).then((listaAlunos) => {
                resposta.json(
                    {
                        status: true,
                        listaAlunos
                    });
            })
            .catch((erro) => {
                resposta.json(
                    {
                        status: false,
                        mensagem:"Não foi possível obte os alunos: " + erro.message
                    }
                );
            });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar alunos!"
            });
        }
    }
}