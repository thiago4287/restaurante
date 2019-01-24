import { Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

import * as jwt from 'jsonwebtoken'
import { apiConfig } from './api-config'

export const handlerAuthorization = (req: Request, resp: Response, next) => {
    //Constante que reberá o token extraido da requisição através do metodo extractToken
    const token = extractToken(req)

    if(!token){
        resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"')
        resp.status(401).json({message: 'Você precisa se autenticar'})
    }else{
        jwt.verify(token, apiConfig.secret, (error, decoded) =>{
            if(decoded){
                next()
            }else{
                resp.status(403).json({message: 'Você não está autorizado!'})
            }
        })
    }
}

function extractToken(req: Request): string {
    let token = undefined
    //O token é passado através do header
    if(req.headers && req.headers.authorization){
        //Authorization: Bearer ZZZ.ZZZ.ZZZ
        const parts: string[]  = req.headers.authorization.split(' ')

        if(parts.length === 2 && parts[0] === 'Bearer'){
            token = parts[1]
        }
    }
    return token
}