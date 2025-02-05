import { Router } from 'express';
import apiRoutes from '../../src/routes/api/index';
const router = Router();

router.use('/api', apiRoutes);

export default router;
