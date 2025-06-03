
'use client';
import AdminTabs from "../components/admintabs/admintabs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function MenuItems(){

  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState();
      const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin"); // Not logged in? Send to login.
    }

    if (status === "authenticated") {
      const checkAdmin = async () => {
        try {
          const res = await fetch("/api/profile");
          const user = await res.json();

          if (user.admin) {
            setIsAdmin(true); // Admin — stay here
          } else {
            router.push("/profile"); // Not admin — redirect to /profile
          }
        } catch (error) {
          console.error("Error fetching admin status:", error);
          router.push("/profile"); // Fallback redirect
        }
      };

      checkAdmin();
    }
  }, [status, router]);

  if (status === "loading" || isAdmin === null) {
    return  (<div className="flex justify-center items-center h-[186px] w-full">
      <span className="loader3"></span>
    </div>);
  }
    return(
        <>
        <AdminTabs/>
        Menu</>
    )
}