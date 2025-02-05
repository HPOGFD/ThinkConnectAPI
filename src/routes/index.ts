import { Router } from 'express';
import apiRoutes from './api/index.js';  // Updated import path
const router = Router();

router.use('/api', apiRoutes);

export default router;
