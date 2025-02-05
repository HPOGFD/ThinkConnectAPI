import { Router } from 'express';
const router = Router();
import { getAllUsers, 
        createUser, 
        getUserById, 
        deleteUser, 
        updateUser } from '../../controllers/usersController.js';

// /api/users
router.route('/')
    .get(getAllUsers)   // Get all users
    .post(createUser);  // Create a new user

// /api/users/:userId
router.route('/:userId')
    .get(getUserById)   // Get a user by ID
    .put(updateUser)    // ✅ Update user by ID
    .delete(deleteUser); // Delete user by ID

export { router as usersRouter };
