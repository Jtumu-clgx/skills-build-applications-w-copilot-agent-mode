import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.get('/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.json(workout);
});

router.post('/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default router;
