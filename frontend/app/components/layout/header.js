"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md relative">
      <Link href="/" className="text-blue-800 font-bold text-3xl sm:text-4xl">
        ZOMATA
      </Link>

      <button
        className="md:hidden text-blue-800"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <nav
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col md:flex md:flex-row gap-6 items-center text-gray-600 font-bold text-lg md:text-xl absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent px-6 py-4 md:p-0 z-20`}
      >
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link
          href="/login"
          onClick={() => setMenuOpen(false)}
          className="bg-blue-800 text-white px-6 py-2 rounded-full"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
