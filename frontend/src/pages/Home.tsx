import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="min-h-[80vh] flex flex-col items-center justify-center px-6 
                 bg-linear-to-br from-blue-100 via-purple-100 to-pink-100"
    >
      <h1
        className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-8 drop-shadow-lg 
                   p-5 rounded-2xl bg-white/40 backdrop-blur-md 
                   shadow-xl transition-transform hover:scale-105"
      >
        📚 Library Management System
      </h1>

      <p className="text-gray-700 text-lg max-w-2xl text-center mb-12 leading-relaxed">
        A simple and efficient application to manage books, authors, users, and borrowing flows.  
        Use the buttons below to navigate to different sections.
      </p>

      <div className="flex flex-wrap gap-6 justify-center">
        <Link
          to="/books"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl
                     hover:bg-blue-700 shadow-lg transition-transform 
                     hover:scale-105 hover:shadow-xl"
        >
          Manage Books
        </Link>

        <Link
          to="/users"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl
                     hover:bg-green-700 shadow-lg transition-transform
                     hover:scale-105 hover:shadow-xl"
        >
          Manage Users
        </Link>

        <Link
          to="/authors"
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl
                     hover:bg-purple-700 shadow-lg transition-transform
                     hover:scale-105 hover:shadow-xl"
        >
          Manage Authors
        </Link>

        <Link
          to="/borrow"
          className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-xl
                     hover:bg-pink-700 shadow-lg transition-transform
                     hover:scale-105 hover:shadow-xl"
        >
          Borrowing
        </Link>
      </div>
    </div>
  );
}
