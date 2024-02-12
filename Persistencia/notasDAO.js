import Notas from '../Modelo/notas.js';
import conectar from './conexao.js';

export default class NotasDAO{

    async gravar(nota){
        if (nota instanceof Notas){
            const sql = `INSERT INTO nota(nota_nomeAluno, nota_disciplina, nota_dataAvaliacao, nota_valorNota) VALUES(?,?,?,?)`;
            const parametros = [nota.nomeAluno, nota.disciplina, nota.dataAvaliacao, nota.valorNota];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            nota.idNota = retorno[0].insertId; //alterei aqui
            global.poolConexoes.releaseConnection(conexao);
        }

    }

    async atualizar(nota){
        if (nota instanceof Notas){
            const sql = `UPDATE nota SET nota_nomeAluno = ?, nota_disciplina = ?, nota_dataAvaliacao = ?, nota_valorNota = ? WHERE nota_cpfAluno = ?`;
            const parametros = [nota.nomeAluno, nota.disciplina, nota.dataAvaliacao, nota.valorNota, nota.cpfAluno];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);        }
    }

    async excluir(nota){
        if (nota instanceof Notas){
            const sql = `DELETE FROM nota WHERE nota_cpfAluno = ?`;
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
            const sql = `SELECT n.nota_cpfAluno, n.nota_nomeAluno, n.nota_disciplina, n.nota_dataAvaliacao, n.nota_valorNota FROM nota n WHERE n.nota_cpfAluno = ? ORDER BY n.nota_nomeAluno`;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const nota = new Notas(
                    registro.nota_cpfAluno, 
                    registro.nota_nomeAluno, 
                    registro.nota_disciplina,
                    registro.nota_dataAvaliacao,
                    registro.nota_valorNota);
                listaNotas.push(nota);    

            }
        }
        else{
            const sql = `SELECT n.nota_cpfAluno, n.nota_nomeAluno, n.nota_disciplina, n.nota_dataAvaliacao, n.nota_valorNota FROM nota n WHERE n.nota_nomeAluno like ? 
            ORDER BY n.nota_nomeAluno
            `;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const nota = new Notas(registro.nota_cpfAluno,registro.nota_nomeAluno, registro.nota_disciplina, registro.nota_dataAvaliacao, registro.nota_valorNota);
                listaNotas.push(nota);
            }
        }

        global.poolConexoes.releaseConnection(conexao); //incluí 
        return listaNotas;
    }


}