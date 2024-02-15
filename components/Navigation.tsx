import React from "react";
import { ImStatsBars } from "react-icons/im";

function Navigation() {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto ">
      <div className="flex items-center justify-between">
        {/* user information */}
        <div className="flex items-center gap-2">
          {/* img */}
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img
              src="https://img-cdn.pixlr.com/image-generator/history/65cc860b02c0b9efeb817654/c1ded4e3-1e38-48e3-ac93-e385d471d6ac/preview.webp"
              alt="xx"
              className="w-full h-full object-cover"
            />
          </div>

          {/* name */}
          <small>Hi, Leon</small>
        </div>

        {/* right side navigation */}
        <nav className="flex items-center gap-4">
          <div>
            <ImStatsBars className="text-2xl" />
          </div>
          <div>
            <button className="btn btn-danger">Sign out</button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
