import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }: any) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("sign out");
    // perform logout action, such as redirecting to login page
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between bg-green-700/95 shadow-xl px-4 py-2">
        <div className="align-center flex p-2">
          <button onClick={() => navigate("/")}>
            <svg
              className="h-6 w-6 text-green-100 font-medium font-sans hover:text-white"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <p className="text-green-100 font-medium font-sans mx-6 self-center">
            AZS UW
          </p>
          <Link
            to="/new-match"
            className="text-green-100 font-medium font-sans hover:text-white mx-6 self-center"
          >
            new match
          </Link>
          <Link
            to="/new-match"
            className="text-green-100 font-medium font-sans hover:text-white mx-6 self-center"
          >
            stats
          </Link>
          <Link
            to="/"
            className="text-green-100 font-medium font-sans hover:text-white mx-6 self-center"
          >
            players
          </Link>
        </div>
        <div>
          <svg
            onClick={handleLogout}
            className="h-6 w-6 text-green-100 font-medium font-sans hover:text-white"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{" "}
            <path d="M7 12h14l-3 -3m0 6l3 -3" />
          </svg>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
