import { Router } from "express";
import { autenticar } from "../Seguranca/autenticacao.js";

const rotalogin = new Router();
rotalogin.post('/', (req, res) =>{
    autenticar(req, res);
})

export default rotalogin;