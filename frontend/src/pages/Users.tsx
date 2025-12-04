import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Keerthi", email: "keerthi@example.com" },
    { id: 2, name: "Sam", email: "sam@example.com" },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addUser = () => {
    if (!name || !email) return alert("Enter all fields!");

    const newUser = {
      id: Date.now(),
      name,
      email,
    };

    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>

      {/* Add User Form */}
      <div className="mb-6 flex gap-3">
        <input
          className="border p-2 rounded w-full"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={addUser}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* User List */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
