import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const entries = await Leaderboard.find()
    .sort({ rank: 1 })
    .populate('user', '-password')
    .populate('team');
  res.json(entries);
});

router.get('/:id', async (req, res) => {
  const entry = await Leaderboard.findById(req.params.id).populate('user', '-password').populate('team');
  if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
  res.json(entry);
});

router.post('/', async (req, res) => {
  try {
    const entry = await Leaderboard.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default router;
