import Image from "next/image";
import Right from "../icons/right";

export default function Landing() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 py-10">
      <div className="text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-blue-950">
          Explore curated lists of top restaurants, cafes, pubs, and bars based on trends
        </h1>
        <button className="text-2xl sm:text-3xl md:text-4xl font-semibold flex items-center justify-center md:justify-start gap-3 bg-blue-300 px-8 py-4 rounded-full mx-auto md:mx-0">
          Order!
          <Right />
        </button>
      </div>

      <div className="relative w-full h-64 sm:h-80 md:h-[500px]">
        <Image
          src="/burger.png"
          alt="Delicious burger"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </section>
  );
}


