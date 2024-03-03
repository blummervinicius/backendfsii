import express from 'express';
import cors from 'cors';
import rotaAluno from './Rotas/rotaAluno.js';
import rotaNotas from './Rotas/rotaNotas.js';
import rotaLogin from './Rotas/rotaLogin.js';
import dotenv from 'dotenv';
import session from 'express-session';
import { verificarAcesso } from './Seguranca/autenticacao.js';


const host='0.0.0.0';
const porta='3000';

dotenv.config();

//console.log(process.env);

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SEGREDO,
    reseve: false,
    saveUninitialized: true, 
    maxAge: 1000 * 60 * 6
}))

app.use('/login', rotaLogin);
//verificar acesso passa a ser o que chamamos de middleware = camada do meio
app.use('/aluno', verificarAcesso, rotaAluno);
app.use('/notas',verificarAcesso, rotaNotas);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
