import { Request, Response } from 'express';
import Thought from '../models/Thought-model.js';


export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const users = await Thought.find();
        res.json({ users, total: users.length });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createThought = async (req: Request, res: Response) => {
    try {
        const user = await Thought.create(req.body);
        res.status(201).json(user); // 201 status for successful creation
    } catch (err) {
        res.status(500).json({ message: "Failed to create Thought", error: err });
    }
};

export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const user = await Thought.findById(req.params.thoughtId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Thought not found' }); // ✅ Fixed error message
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const updateThoughtById = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId, //
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No such thought exists' });
        }

        return res.json(updatedThought);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId); // ✅ Simplified

        if (!thought) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        return res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};

export const addReaction = async (req: Request, res: Response) => {
    console.log('Adding a reaction...');
    console.log('Request Params:', req.params);
    console.log('Request Body:', req.body);

    try {
        const { thoughtId } = req.params; // ✅ Extract the thoughtId from URL

        if (!thoughtId) {
            return res.status(400).json({ message: 'Thought ID is required' });
        }

        // ✅ Ensure request body contains required fields
        if (!req.body.reactionBody || !req.body.username) {
            return res.status(400).json({ message: 'Reaction body and username are required' });
        }

        // ✅ Push the new reaction object into the reactions array
        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $push: { reactions: req.body } }, // ✅ Push reaction object directly from body
            { runValidators: true, new: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }

        return res.json(updatedThought);
    } catch (err) {
        console.error('Error adding reaction:', err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};

