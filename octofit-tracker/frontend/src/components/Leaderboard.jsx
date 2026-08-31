import { useEffect, useState } from 'react';
import { fetchList } from '../api';

// Fallback to localhost when VITE_CODESPACE_NAME is unset, avoiding https://undefined-8000... URLs.
const leaderboardApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(leaderboardApiUrl).then(setEntries).catch((err) => setError(err.message));
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
