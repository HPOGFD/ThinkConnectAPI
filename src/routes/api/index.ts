import { Router } from 'express';
import { usersRouter } from '../../routes/api/usersRoutes';


const router = Router();

router.use('/users', usersRouter);


export default router;
