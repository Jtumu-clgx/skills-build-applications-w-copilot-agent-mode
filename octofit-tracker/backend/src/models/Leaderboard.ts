import { Schema, model } from 'mongoose';

export interface ILeaderboardEntry {
  user: Schema.Types.ObjectId;
  team?: Schema.Types.ObjectId;
  points: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
);

export default model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
