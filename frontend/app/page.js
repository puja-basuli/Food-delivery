import Image from "next/image";
import Header from "./components/layout/header";
import Landing from "./components/layout/main";

export default function Home() {
  return (
    <div>
      <Header />
      <Landing/>
    </div>
  );
}
