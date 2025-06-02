'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import MenuItemCard from "../menu/menuItems";
import SectionHeader from "../sectionHeader";

export default function Homemenu() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative overflow-hidden pb-10">
      {/* Decorative corner images with Tailwind slide-in */}
      <div
        className={`absolute left-0 top-0 h-40 w-40 md:h-64 md:w-64 z-0 hidden sm:block transition-all duration-700 ease-out ${
          animate ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        <Image
          src="/left.png"
          alt=""
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      <div
        className={`absolute right-0 top-0 h-40 w-40 md:h-64 md:w-64 z-0 hidden sm:block transition-all duration-700 ease-out ${
          animate ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
        }`}
      >
        <Image
          src="/right.png"
          alt=""
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Heading */}
      <SectionHeader subheader="check out" mainheader="Menu" />

      {/* Menu items grid */}
      <div className="px-4 sm:px-8 md:px-20 lg:px-40 mt-8">
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
        </div>
      </div>
    </section>
  );
}
