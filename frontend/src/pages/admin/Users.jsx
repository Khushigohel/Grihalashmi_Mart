import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      if (res.data.length === 0) {
        // Dummy data if backend is empty
        setUsers([
          { _id: "1", name: "Dhrupa Patel", email: "dhrupa@example.com", role: "User", createdAt: "2025-09-01T10:00:00.000Z" },
          { _id: "2", name: "John Doe", email: "john@example.com", role: "User", createdAt: "2025-09-02T12:00:00.000Z" },
        ]);
      } else {
        setUsers(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([
        { _id: "1", name: "Dhrupa Patel", email: "dhrupa@example.com", role: "User", createdAt: "2025-09-01T10:00:00.000Z" },
      ]);
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u._id !== id));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p className="no-users">No users found.</p>
      ) : (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Registered On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteUser(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
