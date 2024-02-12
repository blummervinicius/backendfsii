import AlunoDAO from "../Persistencia/alunoDAO.js";

export default class Aluno{
    #cpf;
    #nome;

    constructor(cpf='', nome=''){
        this.#cpf=cpf;
        this.#nome=nome;
    }

    get cpf(){
        return this.#cpf;
    }
    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }
    get nome(){
        return this.#nome;
    }
    set nome(novoNome){
        this.#nome = novoNome;
    }

    toJSON(){
        return {
            cpf:this.#cpf,
            nome:this.#nome
        }
    }

    async gravar(){
        const aluDAO = new AlunoDAO();
        await aluDAO.gravar(this);
    }

    async excluir(){
        const aluDAO = new AlunoDAO();
        await aluDAO.excluir(this);
    }

    async atualizar(){
        const aluDAO = new AlunoDAO();
        await aluDAO.atualizar(this);
    }

    async consultar(parametro){
        const aluDAO = new AlunoDAO();
        return await aluDAO.consultar(parametro);
    }

}
