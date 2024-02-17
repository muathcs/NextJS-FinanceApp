import { authContext } from "@/lib/store/AuthContext";
import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
function SignIn() {
  const { googleLoginHandler } = useContext(authContext);
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <h1 className="mb-6 text-6xl font-bold text-center"></h1>

      <div className="flex flex-col overflow-hidden shadow-md bg-slate-800 shadow-slate-500 rounded-xl">
        <div className="h-52">
          <img
            className="object-cover w-full h-full"
            src="https://www.sme-news.co.uk/wp-content/uploads/2021/11/Login.jpg"
          />
        </div>

        <div className="px-4 py-4 ">
          <h3 className="text-2xl text-center">Please sign in to continue</h3>
          <button
            onClick={googleLoginHandler}
            className="flex self-start gap-2 p-4  mt-6 mx-auto font-medium bg-gray-700 align-middle text-white rounded-lg"
          >
            <FcGoogle className="text-2xl" />
            Google
          </button>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
