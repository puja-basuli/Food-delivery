import Image from "next/image";
import Right from "../icons/right";

export default function Landing() {
  return (
   <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-6 py-16  rounded-xl shadow-lg overflow-hidden">
  {/* Text Section */}
  <div className="text-center md:text-left space-y-6">
    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-blue-200 leading-tight">
      Discover the coolest ice creams around the world <span className="text-amber-400">curated</span> for your cravings.
    </h1>

    <button className="group text-2xl sm:text-3xl font-semibold inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full transition-transform hover:scale-105 hover:bg-blue-500 mx-auto md:mx-0">
      Order!
      <span className="group-hover:translate-x-1 transition-transform">
        <Right />
      </span>
    </button>
  </div>

  {/* Image Section */}
  <div className="relative w-full h-64 sm:h-80 md:h-[500px]">
    <Image
      src="/icecream.png"
      alt="Delicious ice cream"
      fill
      style={{ objectFit: "contain" }}
      priority
    />
  </div>
</section>

  );
}


