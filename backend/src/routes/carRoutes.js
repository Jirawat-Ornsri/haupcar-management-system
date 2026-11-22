import express from 'express';

import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from '../controllers/carController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All car routes require authentication
router.use(protect);

router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

export default router;