import Aluno from "../Modelo/aluno.js";
import conectar from "./conexao.js";

export default class AlunoDAO{
    async gravar(aluno){
        if (aluno instanceof Aluno){
            const sql = "INSERT INTO aluno(alu_nome) VALUES(?)";
            const parametros = [aluno.nome];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql,parametros);
            aluno.cpf = retorno[0].insertCpf;
            global.poolConexoes.releaseConnection(conexao);

        }
    }

    async atualizar(aluno){
        if (aluno instanceof Aluno){
            const sql = "UPDATE aluno SET alu_nome = ? WHERE alu_cpf = ?";
            const parametros = [aluno.nome, aluno.cpf];
            const conexao = await conectar();
            await conexao.execute(sql,parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(aluno){
        if (aluno instanceof Aluno){
            const sql = "DELETE FROM aluno WHERE alu_cpf = ?";
            const parametros = [aluno.cpf];
            const conexao = await conectar();
            await conexao.execute(sql,parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        if (!isNaN(parseInt(parametroConsulta))){
            sql='SELECT * FROM aluno WHERE alu_cpf = ? order by alu_nome';
            parametros = [parametroConsulta];
        }
        else{
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM aluno WHERE alu_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaAlunos = [];
        for (const registro of registros){
            const aluno = new Aluno(registro.alu_cpf,registro.alu_nome);
            listaAlunos.push(aluno);
        }
        return listaAlunos;
    }
}