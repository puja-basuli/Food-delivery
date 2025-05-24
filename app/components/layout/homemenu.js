import Image from "next/image";
import MenuItemCard from "../menu/menuItems";
import SectionHeader from "../sectionHeader";

export default function Homemenu() {
  return (
    <section className="relative overflow-hidden pb-10">
      {/* Decorative corner images — hidden on small screens */}
      <div className="absolute left-0 top-0 h-40 w-40 md:h-64 md:w-64 z-0 hidden sm:block">
       
          <Image
                  src="/left.png"
                  alt=""
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
      </div>
      <div className="absolute right-0 top-0 h-40 w-40 md:h-64 md:w-64 z-0 hidden sm:block">
        <Image
                  src="/right.png"
                  alt=""
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
      </div>

      {/* Heading */}
      <SectionHeader subheader={'check out'} mainheader={'Menu'}/>
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
