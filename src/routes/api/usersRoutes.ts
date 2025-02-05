import { Router } from 'express';
const router = Router();
import { getAllUsers, createUser } from '../../controllers/usersController';

// /api/users
router.route('/').get(getAllUsers).post(createUser);


export { router as usersRouter} ;