'use client';

import AdminTabs from "../components/admintabs/admintabs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const [newcategory, setNewcategory] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const { data: session, status } = useSession();

  // Check user admin status and redirect if needed
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
      return;
    }

    if (status === "authenticated") {
      const checkAdmin = async () => {
        try {
          const res = await fetch("/api/profile");
          const user = await res.json();

          if (user.admin) {
            setIsAdmin(true);
          } else {
            router.push("/profile");
          }
        } catch (error) {
          console.error("Error fetching admin status:", error);
          router.push("/profile");
        }
      };

      checkAdmin();
    }
  }, [status, router]);

  // Fetch categories only when authenticated and admin confirmed
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error loading categories");
      }
    };

    if (status === "authenticated" && isAdmin) {
      fetchCategories();
    }
  }, [status, isAdmin]);

  async function handlenewcategorysubmit(ev) {
    ev.preventDefault();
    setLoading(true);
    setStatusMessage("");
    setError("");

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newcategory }),
      });

      if (response.ok) {
        setNewcategory("");
        setStatusMessage("Category created successfully.");

        // Optionally refetch categories after creating new one
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } else {
        setStatusMessage("Failed to create category.");
      }
    } catch (err) {
      setStatusMessage("Error occurred while creating category.");
    } finally {
      setLoading(false);
    }
  }

  // Render loading spinner while authenticating or checking admin
  if (status === "loading" || isAdmin === null) {
    return (
      <div className="flex justify-center items-center h-[186px] w-full">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <section className="mt-8 flex flex-col items-center justify-center">
      <AdminTabs admin={true} />
      <form
        className="mt-8 flex items-center justify-center gap-10"
        onSubmit={handlenewcategorysubmit}
      >
        <div className="flex gap-2 items-end justify-center">
          <div className="grow">
            <label className="text-gray-100 p-2">New Category</label>
            <input
              type="text"
              placeholder="Type here"
              value={newcategory}
              onChange={(ev) => setNewcategory(ev.target.value)}
              className="input-field bg-gray-100"
              disabled={loading}
            />
          </div>
          <div>
            <button type="submit" disabled={loading || !newcategory.trim()}>
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </form>

      {statusMessage && (
        <p className="text-center mt-4 text-xl text-amber-100">{statusMessage}</p>
      )}

      {error && (
        <p className="text-center mt-4 text-xl text-red-500">{error}</p>
      )}

<div className="p-4">
  <div className="flex flex-col gap-2">
    {categories.length > 0 ? (
      categories.map((cat) => (
        <div
          key={cat.id}
          className="bg-gray-950 text-white p-2 rounded w-130"
        >
          {cat.name}
        </div>
      ))
    ) : (
      <div className="text-white">No categories found.</div>
    )}
  </div>
</div>

      
    </section>
  );
}
