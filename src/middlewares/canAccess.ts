import { Request, Response, NextFunction } from 'express'
import Token from '../models/token'
import jwt from 'jsonwebtoken'

export default (acceptedRoles: string[]) => {
    return function(req: Request, res: Response, next: NextFunction) {
        const token = req.header('Authorization')?.split(' ')[1]
        if(!token) {
            return res.status(403).send('Access Denied.')
        }

        const { roles } = jwt.decode(token, { complete: true, json: true })?.payload as Token
        const authorized = acceptedRoles.some(role => roles.includes(role))
        if(!authorized) {
            return res.status(403).send('Access Denied.')
        }

        next()
    }
}