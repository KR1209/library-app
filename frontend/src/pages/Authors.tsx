import { useEffect, useState } from "react";

export default function Authors() {
  const [authors, setAuthors] = useState<
    { id: number; name: string }[]
  >([]);

  const [newAuthor, setNewAuthor] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  // Temporary mock data
  useEffect(() => {
    setAuthors([
      { id: 1, name: "J.K. Rowling" },
      { id: 2, name: "George R.R. Martin" },
      { id: 3, name: "Agatha Christie" },
    ]);
  }, []);

  // Add Author
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = authors.length + 1;
    const newItem = { id: nextId, name: newAuthor };

    setAuthors([...authors, newItem]);
    setNewAuthor("");
  };

  // Start Edit
  const startEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  // Save edit
  const saveEdit = (id: number) => {
    const updated = authors.map((a) =>
      a.id === id ? { ...a, name: editingName } : a
    );

    setAuthors(updated);
    setEditingId(null);
    setEditingName("");
  };

  // Delete
  const deleteAuthor = (id: number) => {
    setAuthors(authors.filter((a) => a.id !== id));
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-blue-700 mb-5">
        Authors
      </h1>

      {/* Add Author Card */}
      <div className="bg-white p-5 rounded-xl shadow-md mb-6">
        <form
          onSubmit={handleAdd}
          className="flex gap-4 items-center"
        >
          <input
            type="text"
            placeholder="Enter author name"
            required
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            Add
          </button>
        </form>
      </div>

      {/* Authors Table */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {authors.map((a) => (
              <tr key={a.id} className="border">
                <td className="p-3 border">{a.id}</td>

                <td className="p-3 border">
                  {editingId === a.id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) =>
                        setEditingName(e.target.value)
                      }
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    a.name
                  )}
                </td>

                <td className="p-3 border">
                  {editingId === a.id ? (
                    <>
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded mr-2"
                        onClick={() => saveEdit(a.id)}
                      >
                        Save
                      </button>

                      <button
                        className="px-3 py-1 bg-gray-500 text-white rounded"
                        onClick={() => {
                          setEditingId(null);
                          setEditingName("");
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded mr-3"
                        onClick={() => startEdit(a.id, a.name)}
                      >
                        Edit
                      </button>

                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded"
                        onClick={() => deleteAuthor(a.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
