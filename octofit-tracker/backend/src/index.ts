import express from 'express';
import cors from 'cors';
import './config/database';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

app.use(cors());
app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({ message: 'Octofit Tracker API' });
});

app.listen(port, () => {
  console.log(`Octofit Tracker API listening on port ${port}`);
});
