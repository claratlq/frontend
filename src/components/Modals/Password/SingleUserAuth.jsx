import React, { useState } from "react";
import System from "../../../models/system";
import { AUTH_TOKEN, AUTH_USER } from "../../../utils/constants";
import { GoogleLogin } from '@react-oauth/google';
import { Buffer } from 'buffer';

function parseJwtPayload (token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}


export default function SingleUserAuth() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    setError(null);
    setLoading(true);
    e.preventDefault();
    const data = {};

    const form = new FormData(e.target);
    for (var [key, value] of form.entries()) data[key] = value;
    const { valid, token, message } = await System.requestToken(data);
    if (valid && !!token) {
      window.localStorage.setItem(AUTH_TOKEN, token);
      window.localStorage.setItem("user", data["username"]);
      window.location.reload();
    } else {
      setError(message);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async (resp) => {
    setError(null);
    setLoading(true);

    const { authentication, token } = await System.checkGoogleAuth(resp.credential);
    // console.log(authentication, token)

    if (authentication) {
      const parsedCredentials = parseJwtPayload(resp.credential); 
      window.localStorage.setItem(AUTH_TOKEN, token);
      window.localStorage.setItem("user", parsedCredentials.name);
      window.localStorage.setItem("googleAuthToken", resp.credential);
      window.location.reload();
    } else {
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="relative bg-white rounded-lg shadow dark:bg-stone-700">
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-md md:text-xl font-semibold text-gray-900 dark:text-white">
            This workspace is password protected.
          </h3>
        </div>
        {/* <div className="p-6 space-y-6 flex h-full w-full">
          <div className="w-full flex flex-col gap-y-4">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Workspace Username
              </label>
              <input
                name="username"
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-600 dark:border-stone-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={true}
                autoComplete="off"
              />
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Workspace Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-600 dark:border-stone-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={true}
                autoComplete="off"
              />
            </div>
            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm">
                Error: {error}
              </p>
            )}
            <p className="text-gray-800 dark:text-slate-200 md:text-sm text-xs">
              You will only have to enter this password once. After successful
              login it will be stored in your browser.
            </p>
          </div>
        </div> */}
        <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          {/* <button
            disabled={loading}
            type="submit"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            {loading ? "Validating..." : "Submit"}
          </button> */}
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              handleGoogleLogin(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </form>
  );
}
