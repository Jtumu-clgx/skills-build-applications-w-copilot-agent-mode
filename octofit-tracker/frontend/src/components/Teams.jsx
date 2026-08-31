import { useEffect, useState } from 'react';
import { API_ORIGIN, fetchList } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(`${API_ORIGIN}/api/teams/`).then(setTeams).catch((err) => setError(err.message));
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
