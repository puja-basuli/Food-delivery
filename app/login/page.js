"use client";
import { useState } from "react";

import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const router = useRouter();
   const { data: session,status } = useSession(); 
      if(status=== 'loading'){
          return 'LOADING...'
      }
      if(status==='authenticated'){
          router.push('/profile');
        return null;
      }

  const notify = () => toast.success("Login successful!");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setError("");
    setLoggingIn(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setError(res.error);
    } else {
      notify();
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
    }

    setLoggingIn(false);
  }

  return (
    <div className="h-186 flex justify-center bg-gray-950 p-0 m-0 rounded-xl">
      <div className=" w-128 h-128 mt-5 p-10 ">
    <section className="mt-8 bg-gray-900 p-10 rounded-xl ">
      <h1 className="text-center gradient-t text-4xl">Login</h1>

      <ToastContainer />

      <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={loggingIn}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          disabled={loggingIn}
        />
        <button type="submit" disabled={loggingIn}>
          {loggingIn ? "Logging in..." : "Login"}
        </button>

        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}

        <div className="text-gray-600 text-center mt-5 mb-2">or</div>

        <button
          type="button"
           onClick={() => signIn('google', {callbackUrl:'/'})}
          className="flex items-center justify-center gap-3 border border-amber-50 px-30 py-2 max-h-10 rounded-2xl mx-auto mt-4"
        >
          <Image src="/google.png" alt="Google" width={20} height={20} />
          <span className="text-sm text-amber-50 whitespace-nowrap">
            Login with Google
          </span>
        </button>

        <div className="text-center my-4 text-gray-300 border-t pt-4">
          Don’t have an account? <Link className="underline" href="/register">Register here</Link>
        </div>
      </form>
    </section>
     </div>
    </div>
  );
}
