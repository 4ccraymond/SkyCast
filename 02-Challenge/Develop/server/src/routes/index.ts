import { Router } from 'express';
import weatherRoutes from './api/weatherRoutes.js';

const router = Router();

import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

router.use('/api', weatherRoutes);
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

export default router;
