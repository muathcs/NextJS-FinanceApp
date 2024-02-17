import { authContext } from "@/lib/store/AuthContext";
import React, { useContext } from "react";
import { ImStatsBars } from "react-icons/im";

function Navigation() {
  const { user, loading, logout } = useContext(authContext);

  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto ">
      <div className="flex items-center justify-between">
        {/* user information */}
        {user && !loading && (
          <div className="flex items-center gap-2">
            {/* img */}
            <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
              <img
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* name */}
            <small>Hi, {user.displayName}</small>
          </div>
        )}

        {/* right side navigation */}
        {user && !loading && (
          <nav className="flex items-center gap-4">
            <div>
              <a href="#stats">
                <ImStatsBars className="text-2xl" />
              </a>
            </div>
            <div>
              <button onClick={logout} className="btn btn-danger">
                Sign out
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navigation;
