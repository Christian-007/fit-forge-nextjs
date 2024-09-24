"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import { Button } from "./components/buton";

export default function Page() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <img
        className="my-2"
        src="fit_forge_logo.png"
        alt="Fit Forge Logo"
        width="150"
        height="150"
      />
      <div className="w-full max-w-sm">
        <form>
          <div className="mb-6">
            <label className="my-2 block text-slate-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="ring-1 ring-slate-400 appearance-none rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-6">
            <label className="my-2 block text-slate-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="ring-1 ring-slate-400 appearance-none rounded-md p-2 w-full"
            />
          </div>
          <button className="w-full my-2 bg-slate-900 text-white font-semibold rounded-md p-2 hover:bg-slate-700">
            Login to account
          </button>
        </form>
      </div>
    </div>
  );
}
