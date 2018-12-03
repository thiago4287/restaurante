import {Request, Response } from 'express'
import { User, users } from './user'

export const handleAuthentication  = (req: Request, resp: Response) => {
    const user: User = req.body

    if(isValid(user)){
        const dbUser: User = users[user.email]
        resp.json({name: dbUser.nome, email: dbUser.email})
    }else{
        resp.status(403).json({message: 'Dados inválidos3!'})
        const dbUser2: User = users[user.email]
        resp.json({name: dbUser2.nome, email: dbUser2.email})
    }
}

function isValid(user: User): boolean{
    if(!user){
        return false
    }
    const dbUser = users[user.email]
    return dbUser === dbUser.matches(user)
}