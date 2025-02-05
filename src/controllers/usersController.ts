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



/**
 * POST Add Friend to User's Friend List
 * @route POST /users/:userId/friends/:friendId
 * @param string userId - ID of the user to add a friend to
 * @param string friendId - ID of the friend to add
 * @returns Updated User object with new friend added
 */
export const addFriends = async (req: Request, res: Response) => {
    console.log('Adding a friend...');
    console.log('Request Params:', req.params);

    try {
        const { userId, friendId } = req.params;

        if (!friendId) {
            return res.status(400).json({ message: 'Friend ID is required' });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { friends: friendId } }, // ✅ Add friend ID to friends array
            { runValidators: true, new: true }   // ✅ Return updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID' });
        }

        return res.json(user);
    } catch (err) {
        console.error('Error adding friend:', err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};

/**
 * DELETE Remove Friend from User's Friend List
 * @route DELETE /users/:userId/friends/:friendId
 * @param string userId - ID of the user
 * @param string friendId - ID of the friend to remove
 * @returns Updated User object after removing the friend
 */
export const removeFriend = async (req: Request, res: Response) => {
    console.log('Removing a friend...');
    console.log('Request Params:', req.params);

    try {
        const { userId, friendId } = req.params;

        if (!friendId) {
            return res.status(400).json({ message: 'Friend ID is required' });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId } }, // ✅ Remove friend from the friends array
            { runValidators: true, new: true }   // ✅ Return updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID' });
        }

        return res.json(user); // Return updated user object
    } catch (err) {
        console.error('Error removing friend:', err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};



