import { Router } from 'express';
import { usersRouter } from '../../routes/api/usersRoutes';
import { thoughtsRouter } from '../../routes/api/thoughtsRoutes';

const router = Router();

router.use('/users', usersRouter);
router.use('/thoughts', thoughtsRouter);

export default router;
