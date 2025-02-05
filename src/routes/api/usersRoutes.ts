import { Router } from 'express';
const router = Router();
import { getAllUsers, createUser, getUserById, deleteUser } from '../../controllers/usersController.js';

// /api/users
router.route('/').get(getAllUsers).post(createUser);
// /api/users/:studentId
router.route('/:userId').get(getUserById).delete(deleteUser);

export { router as usersRouter} ;