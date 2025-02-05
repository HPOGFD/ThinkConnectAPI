import { Request, Response } from 'express';
import User from '../models/User.js';

/**
 * GET All Users /users
 * @returns an array of Users
 */
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json({ users, total: users.length });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * POST Create User /users
 * @param object user
 * @returns a single User object
 */
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user); // 201 status for successful creation
    } catch (err) {
        res.status(500).json({ message: "Failed to create user", error: err });
    }
};

/**
 * GET User by ID /users/:userId
 * @param string userId
 * @returns a single User object
 */
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' }); // ✅ Fixed error message
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * DELETE User by ID /users/:userId
 * @param string userId
 * @returns success message
 */
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId); // ✅ Simplified

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};

/**
 * PUT Update User by ID /users/:userId
 * @param string userId
 * @param object updatedData
 * @returns updated User object
 */
export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId, // ✅ Directly using userId
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        return res.json(updatedUser);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};
