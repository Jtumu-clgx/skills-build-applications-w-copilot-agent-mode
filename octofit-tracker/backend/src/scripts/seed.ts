import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ada Lovelace', email: 'ada@octofit.com', password: 'changeme' },
      { name: 'Grace Hopper', email: 'grace@octofit.com', password: 'changeme' },
      { name: 'Alan Turing', email: 'alan@octofit.com', password: 'changeme' },
      { name: 'Margaret Hamilton', email: 'margaret@octofit.com', password: 'changeme' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Octobyte Runners', members: [users[0]._id, users[1]._id] },
      { name: 'Byte Crushers', members: [users[2]._id, users[3]._id] },
    ]);

    await User.findByIdAndUpdate(users[0]._id, { team: teams[0]._id });
    await User.findByIdAndUpdate(users[1]._id, { team: teams[0]._id });
    await User.findByIdAndUpdate(users[2]._id, { team: teams[1]._id });
    await User.findByIdAndUpdate(users[3]._id, { team: teams[1]._id });

    await Activity.insertMany([
      { user: users[0]._id, type: 'Running', durationMinutes: 30, caloriesBurned: 300 },
      { user: users[1]._id, type: 'Cycling', durationMinutes: 45, caloriesBurned: 400 },
      { user: users[2]._id, type: 'Swimming', durationMinutes: 60, caloriesBurned: 500 },
      { user: users[3]._id, type: 'Yoga', durationMinutes: 20, caloriesBurned: 100 },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 300, rank: 1 },
      { user: users[2]._id, team: teams[1]._id, points: 250, rank: 2 },
      { user: users[1]._id, team: teams[0]._id, points: 200, rank: 3 },
      { user: users[3]._id, team: teams[1]._id, points: 100, rank: 4 },
    ]);

    await Workout.insertMany([
      { name: 'Morning 5K', description: 'A steady 5K run to start the day', difficulty: 'beginner', durationMinutes: 30 },
      { name: 'HIIT Blast', description: 'High intensity interval training circuit', difficulty: 'advanced', durationMinutes: 25 },
      { name: 'Full Body Strength', description: 'Bodyweight strength training routine', difficulty: 'intermediate', durationMinutes: 40 },
      { name: 'Recovery Yoga', description: 'Gentle yoga flow for recovery days', difficulty: 'beginner', durationMinutes: 20 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
