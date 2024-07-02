import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const { currentUser } = useSelector((state) => state.user.user);
  console.log(currentUser);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold">Auth app</h1>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/profile">
            <li>profile</li>
          </Link>
          <Link to="/about">
            <li>about</li>
          </Link>

          {currentUser ? (
            <img
              src={currentUser.profilePicture}
              alt="profile"
              className="h-7 w-7 rounded-full"
            />
          ) : (
            <Link to="/signin">signin</Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
