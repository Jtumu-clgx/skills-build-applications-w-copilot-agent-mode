import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members', '-password');
  res.json(teams);
});

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members', '-password');
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json(team);
});

router.post('/', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default router;
