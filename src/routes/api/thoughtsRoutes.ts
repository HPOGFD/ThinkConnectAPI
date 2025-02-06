import {Router} from 'express';
const router = Router();
import { getAllThoughts, 
        createThought, 
        getThoughtById,
        updateThoughtById,
        deleteThought
    } from '../../controllers/thoughtsController.js';    

// /api/thoughts
router.route('/')
    .get(getAllThoughts)   // Get all thoughts,  // Get a thought by ID
    .post(createThought) // Create a new thought

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getThoughtById)   // Get a thought by ID
    .put(updateThoughtById)    // ✅ Update thought by ID
    .delete(deleteThought); // Delete thought by ID


export { router as thoughtsRouter};