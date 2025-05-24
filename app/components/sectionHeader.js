export default function SectionHeader({ subheader, mainheader }) {
  return (
    <div className=" text-center sm:pt-32 px-4">
      <h3 className="uppercase font-bold text-gray-500 text-sm sm:text-base mb-2">
        {subheader}
      </h3>
      <h2 className="italic text-3xl sm:text-5xl font-bold text-blue-500">
        {mainheader}
      </h2>
    </div>
  );
}
