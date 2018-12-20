import {Request, Response } from 'express'
import { User, users } from './user'

export const handleAuthentication  = (req: Request, resp: Response) => {
    const user: User = req.body
    console.log("nome do usuário: "+ users[user.nome])
    if(isValid(user)){
        const dbUser: User = users[user.email]
        resp.json({nome: dbUser.nome, email: dbUser.email})
    }else{
        resp.status(403).json({message: 'Dados inválidos3!'})
        const dbUser2: User = users[user.email]
        resp.json({nome: dbUser2.nome, email: dbUser2.email})
    }
}

function isValid(user: User): boolean{
    if(!user){
        return false
    }
    const dbUser = users[user.email]
    return dbUser === dbUser.matches(user)
}