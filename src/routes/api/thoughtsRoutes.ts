import {Router} from 'express';
const router = Router();
import { getAllThoughts, 
        createThought, 
        getThoughtById,
        updateThoughtById,
        deleteThought,
        addReaction,
        deleteReaction
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

    //api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')   
    .post(addReaction)
    
    // /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')   
.delete(deleteReaction); // Delete reaction by reactionId

    

export { router as thoughtsRouter};