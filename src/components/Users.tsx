import { useState, useEffect } from "react";
import axios from "../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const headers = {};
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/player-match/all", {
          headers,
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <p>users</p>
      {users.map((user: any) => (
        <div key={user._id}>
          {user.playerName} on field: {JSON.stringify(user)}
        </div>
      ))}
    </div>
  );
};

export default Users;
