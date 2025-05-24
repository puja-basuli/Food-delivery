import Image from "next/image";

export default function MenuItemCard() {
  return (
    <div className="bg-blue-100 p-4 sm:p-6 rounded-lg text-center shadow-md hover:bg-amber-100 hover:shadow-lg transition-shadow duration-200">
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto">
        <Image
          src="/burger.png"
          alt="burger"
          fill
          className="object-contain"
        />
      </div>
      <h3 className="font-semibold text-lg sm:text-xl my-2 sm:my-3">Burger</h3>
      <p className="text-gray-500 text-sm sm:text-base px-1 sm:px-2">
        Tasty burger with cheese, lettuce, and tomato.
      </p>
      <button className="mt-4 bg-amber-300 py-2 px-4 sm:px-6 rounded-full hover:bg-blue-400 transition-colors text-sm sm:text-base">
        Add to cart
      </button>
    </div>
  );
}
