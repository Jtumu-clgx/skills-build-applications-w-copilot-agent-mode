import { useEffect, useState } from 'react';
import { fetchList } from '../api';

// Fallback to localhost when VITE_CODESPACE_NAME is unset, avoiding https://undefined-8000... URLs.
const workoutsApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(workoutsApiUrl).then(setWorkouts).catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h1>Workouts</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Difficulty</th>
            <th>Duration (min)</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.name}</td>
              <td>{workout.description}</td>
              <td>{workout.difficulty}</td>
              <td>{workout.durationMinutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;
