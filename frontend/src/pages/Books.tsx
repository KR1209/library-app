import { useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "Atomic Habits", author: "James Clear" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho" },
  ]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  const addBook = () => {
    if (!title || !author) return alert("Enter all fields!");

    const newBook = {
      id: Date.now(),
      title,
      author,
    };

    setBooks([...books, newBook]);
    setTitle("");
    setAuthor("");
  };

  const startEdit = (book: Book) => {
    setEditId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
  };

  const updateBook = () => {
    if (!title || !author) return alert("Enter all fields!");

    setBooks(
      books.map((b) =>
        b.id === editId ? { ...b, title, author } : b
      )
    );

    setEditId(null);
    setTitle("");
    setAuthor("");
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Books Management</h1>

      {/* Add / Edit Book */}
      <div className="mb-6 flex gap-3">
        <input
          className="border p-2 rounded w-full"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        {editId ? (
          <button
            onClick={updateBook}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={addBook}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        )}
      </div>

      {/* Book List */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td className="p-2 border">{b.title}</td>
              <td className="p-2 border">{b.author}</td>
              <td className="p-2 border text-center space-x-2">
                <button
                  onClick={() => startEdit(b)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteBook(b.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {books.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No books available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
