import { useEffect, useState } from 'react';
import { fetchList } from '../api';

// Fallback to localhost when VITE_CODESPACE_NAME is unset, avoiding https://undefined-8000... URLs.
const teamsApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(teamsApiUrl).then(setTeams).catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h1>Teams</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{(team.members ?? []).map((member) => member.name ?? member).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
