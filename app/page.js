import Image from "next/image";
import Header from "./components/layout/header";
import Landing from "./components/layout/main";
import Homemenu from "./components/layout/homemenu";
import Menuitems from "./components/menu/menuItems";
import SectionHeader from "./components/sectionHeader";

export default function Home() {
  return (
    <div>
      
      <Landing />
      <Homemenu />
      <section className="text-center my-16 relative -top-50">
        <SectionHeader subheader={"What are we?"} mainheader={"About us!"} />
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
           <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit voluptate
          facilis temporibus, odio reprehenderit doloribus minima? Pariatur
          corrupti maiores, maxime, nihil neque fugiat cupiditate impedit
          voluptas magni accusamus veritatis. Corporis nisi, quae veritatis vero
          voluptatem accusantium dignissimos beatae. Odio eius, ad modi eaque
          neque aspernatur quos porro assumenda veritatis sequi.
        </p>
         <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit voluptate
          facilis temporibus, odio reprehenderit doloribus minima? Pariatur
          corrupti maiores, maxime, nihil neque fugiat cupiditate impedit
          voluptas magni accusamus veritatis. Corporis nisi, quae veritatis vero
          voluptatem accusantium dignissimos beatae. Odio eius, ad modi eaque
          neque aspernatur quos porro assumenda veritatis sequi.
        </p>
        </div>
       
      </section>

      <section className="relative -top-70 text-center flex flex-col gap-4 ">
        <SectionHeader subheader={'any queries?'} mainheader={'Contact Us'}/>
        <a href="tel:000000000" className="text-4xl text-gray-600">
          +91 1234567890
        </a>
      </section>

     
    </div>
  );
}
