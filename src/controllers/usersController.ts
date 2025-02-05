import { Request, Response } from 'express';
import User from '../../src/models/User';



/**
 * GET All Users /users
 * @returns an array of Users
*/
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        const userObj = {
            users,
            total: users.length
        }

        res.json(userObj);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}



/**
 * POST Users /users
 * @param object user
 * @returns a single User object
*/

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}


