import { useEffect, useState } from 'react';
import { API_ORIGIN, fetchList } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList(`${API_ORIGIN}/api/users/`).then(setUsers).catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h1>Users</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
