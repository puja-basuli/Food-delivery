"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession(); 
  const userdata= session?.user;
  let username= userdata?.name || userdata?.email;
  const [menuOpen, setMenuOpen] = useState(false);
  if(username?.includes(' ')){
    username= username.split(' ')[0];
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md sticky top-0 z-50 bg-gray-900">
     <Link
  href="/"
  className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent duration-200 hover:scale-105"
>
  FROZENTREATS
</Link>

      <div
        className="md:hidden text-blue-600 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        role="button"
        aria-label="Toggle Menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      <nav
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col md:flex md:flex-row md:items-center gap-4 md:gap-6 text-gray-200 font-bold text-lg md:text-xl absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent px-6 py-4 md:p-0 z-20`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
          <Link href="/menu" onClick={() => setMenuOpen(false)} className="duration-200 hover:scale-105">Menu</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="duration-200 hover:scale-105">About</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="duration-200 hover:scale-105">Contact</Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:ml-6 gap-3 md:gap-3 mt-4 md:mt-0">
          {status === 'authenticated' && (
            <>
            <Link href={'/profile'} className="whitespace-nowrap duration-200 hover:scale-105">HI, {username}</Link>
             <button 
              onClick={() => signOut()}
              className="bg-blue-600 text-white px-6 py-2 rounded-full duration-200 hover:scale-105 hover:bg-blue-400"
            >
              LOGOUT
            </button></>
           
          )}

          {status !== 'authenticated' && (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-2 rounded-full text-gray-200 font-semibold duration-200 hover:scale-105"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-full duration-200 hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
