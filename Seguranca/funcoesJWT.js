//Funções utilizadas para gerar token de acesso (ingresso válido para acessar nossa API)
//além de verificar se a assinatura do token é válida
//nos não podemos manter senhas e segredos disponibilizados no código fonte
//Informações sensíveis devem ser armazenadas em variáveis de ambiente 

import jwt from 'jsonwebtoken';

export function assinar(usuario){
    const token = jwt.sign({usuario}, process.env.SEGREDO, {expiresIn: '300s'});
    return token;
}

export function verificarAssinatura(token){
    return jwt.verify(token, process.env.SEGREDO);
}