import { Router } from "express";
import notasCtrl from "../Controle/notasCtrl.js";
import NotasCtrl from "../Controle/notasCtrl.js";

const notasCtrl = new NotasCtrl();
const rotaNotas = new Router();

rotaNotas
.get('/',notasCtrl.consultar)
.get('/:termo',notasCtrl.consultar)
.post('/',notasCtrl.gravar)
.patch('/',notasCtrl.atualizar)
.put('/',notasCtrl.atualizar)
.delete('/',notasCtrl.excluir);

export default rotaNotas;
