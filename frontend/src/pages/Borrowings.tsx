import { useEffect, useState } from "react";

interface Borrowing {
  id: number;
  book: string;
  user: string;
  status: "Borrowed" | "Returned";
}

export default function Borrowings() {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [bookName, setBookName] = useState("");
  const [userName, setUserName] = useState("");

  // Mock data
  useEffect(() => {
    setBorrowings([
      { id: 1, book: "Harry Potter", user: "John Doe", status: "Borrowed" },
      { id: 2, book: "Game of Thrones", user: "Jane Smith", status: "Returned" },
    ]);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = borrowings.length + 1;
    setBorrowings([
      ...borrowings,
      { id: nextId, book: bookName, user: userName, status: "Borrowed" },
    ]);
    setBookName("");
    setUserName("");
  };

  const markReturned = (id: number) => {
    setBorrowings(
      borrowings.map((b) =>
        b.id === id ? { ...b, status: "Returned" } : b
      )
    );
  };

  const deleteBorrowing = (id: number) => {
    setBorrowings(borrowings.filter((b) => b.id !== id));
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-blue-700 mb-5">
        Borrowings
      </h1>

      {/* Add Borrowing */}
      <div className="bg-white p-5 rounded-xl shadow-md mb-6">
        <form onSubmit={handleAdd} className="flex gap-4 items-center flex-wrap">
          <input
            type="text"
            placeholder="Book Name"
            required
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="border p-2 rounded w-full md:w-auto flex-1"
          />
          <input
            type="text"
            placeholder="User Name"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border p-2 rounded w-full md:w-auto flex-1"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            Add Borrowing
          </button>
        </form>
      </div>

      {/* Borrowings Table */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Book</th>
              <th className="p-3 border">User</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {borrowings.map((b) => (
              <tr key={b.id} className="border">
                <td className="p-3 border">{b.id}</td>
                <td className="p-3 border">{b.book}</td>
                <td className="p-3 border">{b.user}</td>
                <td className="p-3 border">{b.status}</td>
                <td className="p-3 border flex gap-2">
                  {b.status === "Borrowed" && (
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded"
                      onClick={() => markReturned(b.id)}
                    >
                      Return
                    </button>
                  )}
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => deleteBorrowing(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
