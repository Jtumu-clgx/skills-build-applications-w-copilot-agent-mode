import { useEffect, useState } from 'react';
import { API_ORIGIN, fetchList } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(`${API_ORIGIN}/api/leaderboard/`).then(setEntries).catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h1>Leaderboard</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.rank}</td>
              <td>{entry.user?.name ?? entry.user}</td>
              <td>{entry.team?.name ?? entry.team}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
