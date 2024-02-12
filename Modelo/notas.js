import NotasDAO from "../Persistencia/notasDAO.js";

export default class Notas{
    #cpfAluno;
    #nomeAluno;
    #disciplina;
    #dataAvaliacao;
    #valorNota;
    #aluno;

    constructor(cpfAluno='',nomeAluno='',disciplina='',dataAvaliacao='',valorNota='',aluno={}){
        this.#cpfAluno=cpfAluno;
        this.#nomeAluno=nomeAluno;
        this.#disciplina=disciplina;
        this.#dataAvaliacao=dataAvaliacao;
        this.#valorNota=valorNota;
        this.#aluno=aluno; //é um objeto do tipo aluno
    } 

    get cpfAluno(){
        return this.#cpfAluno;
    }

    set cpfAluno(novoCpfAluno){
        this.#cpfAluno = novoCpfAluno;
    }

    get nomeAluno(){
        return this.#nomeAluno;
    }

    set nomeAluno(novoNomeAluno){
        this.#nomeAluno = novoNomeAluno;
    }

    get disciplina(){
        return this.#disciplina;
    }

    set disciplina(novaDisciplina){
        this.#disciplina = novaDisciplina;
    }

    get dataAvaliacao(){
        return this.#dataAvaliacao;
    }

    set dataAvaliacao(novaDataAvaliacao){
        this.#dataAvaliacao = novaDataAvaliacao;
    }

    get valorNota(){
        return this.#valorNota;
    }

    set valorNota(novoValorNota){
        this.#valorNota = novoValorNota;
    }

    get aluno(){
        return this.#aluno;
    }

    set aluno(novoAluno){
        this.#aluno = novoAluno;
    }

    toJSON(){
        return{
            cpfAluno:this.#cpfAluno,
            nomeAluno:this.#nomeAluno,
            disciplina:this.#disciplina,
            dataAvaliacao:this.#dataAvaliacao,
            valorNota:this.#valorNota,
            aluno:this.#aluno,
        }
    }

    async gravar(){
        const notaDAO = new NotasDAO();
        await notaDAO.gravar(this);
    }

    async excluir(){
        const notaDAO = new NotasDAO();
        await notaDAO.excluir(this);
    }

    async atualizar(){
        const notaDAO = new NotasDAO();
        await notaDAO.atualizar(this);
    }    

    async consultar(termo){
        const notaDAO = new NotasDAO();
        return await notaDAO.consultar(termo);
    }

}