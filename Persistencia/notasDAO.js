import Notas from '../Modelo/notas.js';
import Aluno from '../Modelo/aluno.js';
import conectar from './conexao.js';

export default class NotasDAO{

    async gravar(nota){
        if (nota instanceof Notas){
            const sql = `INSERT INTO notas(nota_cpfAluno, nota_nomeAluno, nota_disciplina, nota_dataAvaliacao, nota_valorNota, alu_cpf) VALUES(?,?,?,?,?,?)`;
            const parametros = [nota.nomeAluno, nota.disciplina, nota.dataAvaliacao, nota.valorNota, nota.aluno.cpf];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            nota.cpfAluno = retorno[0].insertId; //alterei aqui
            global.poolConexoes.releaseConnection(conexao);
        }

    }

    async atualizar(nota){
        if (nota instanceof Notas){
            const sql = `UPDATE notas SET nota_nomeAluno = ?, nota_disciplina = ?, nota_dataAvaliacao = ?, nota_valorNota = ?, alu_cpf = ? WHERE nota_cpfAluno = ?`;
            const parametros = [nota.nomeAluno, nota.disciplina, nota.dataAvaliacao, nota.valorNota, nota.aluno.cpf, nota.cpfAluno];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);        }
    }

    async excluir(nota){
        if (nota instanceof Notas){
            const sql = `DELETE FROM notas WHERE nota_cpfAluno = ?`;
            const parametros = [nota.cpfAluno];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo){
        if (!termo){
            termo="";
        }
        const conexao = await conectar();
        let listaNotas = [];
        if (!isNaN(parseInt(termo))){
            const sql = `SELECT n.nota_cpfAluno, n.nota_nomeAluno, n.nota_disciplina, n.nota_dataAvaliacao, n.nota_valorNota, a.alu_cpf, a.alu_nome 
            FROM notas n 
            INNER JOIN aluno a ON n.alu_cpf = a.alu_cpf
            WHERE n.nota_cpfAluno = ? 
            ORDER BY n.nota_nomeAluno
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const aluno = new Aluno(registro.alu_cpf, registro.alu.nome);
                const nota = new Notas(
                    registro.nota_cpfAluno, 
                    registro.nota_nomeAluno, 
                    registro.nota_disciplina,
                    registro.nota_dataAvaliacao,
                    registro.nota_valorNota, 
                    aluno
                    );
                listaNotas.push(nota);    

            }
        }
        else{
            const sql = `SELECT n.nota_cpfAluno, n.nota_nomeAluno, n.nota_disciplina, n.nota_dataAvaliacao, n.nota_valorNota, a.alu_cpf, a.alu_nome 
            FROM notas n 
            INNER JOIN aluno a ON n.alu_cpf = a.alu_cpf
            WHERE n.nota_nomeAluno like ? 
            ORDER BY n.nota_nomeAluno
            `;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const aluno = new Aluno(registro.alu_cpf, registro.alu.nome);
                const nota = new Notas(registro.nota_cpfAluno, registro.nota_nomeAluno, registro.nota_disciplina, registro.nota_dataAvaliacao, registro.nota_valorNota,
                aluno
                );
                listaNotas.push(nota);
            }
        }

        global.poolConexoes.releaseConnection(conexao); //incluí 
        return listaNotas;
    }


}