"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
 import { ToastContainer, toast } from 'react-toastify';
import { signIn } from "next-auth/react";
export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const notify = () => toast("Registration successful");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setError('');
    setUserCreated(false);
    setCreatingUser(true);

    try {
      const res = await 
     
      fetch('/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})
;

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setUserCreated(true);
       notify();
    } catch (err) {
      setError(err.message);
    }

    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-blue-600 text-4xl">Register</h1>

      {userCreated && (
        <div className="text-green-500 mt-2 text-center">
          
          <a href="/login" className="underline text-green-600">Login here</a>
        </div>
      )}
<ToastContainer/>
      <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          disabled={creatingUser}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>
          {creatingUser ? 'Registering...' : 'Register'}
        </button>

        {error && (
          <div className="text-red-500 mt-2 text-center">{error}</div>
        )}

        <div className="text-gray-600 text-center mt-5 mb-2">or</div>

     <button
       type="button" onClick={async () => {
  try {
    await signIn('google');
  } catch (error) {
    console.error('OAuth login failed:', error);
  }
}}
       className="flex items-center justify-center gap-3 border border-amber-50 px-30 py-2 max-h-10 rounded-2xl mx-auto mt-4"
     >
       <Image
         src="/google.png"
         alt="Google"
         width={20}
         height={20}
       />
       <span className="text-sm text-amber-50 whitespace-nowrap">Login with Google</span>
     </button>
       
         <div className="text-center my-4 text-gray-300 border-t pt-4">
          Existing account?{' '}
          <Link className="underline" href={'/login'}>Login here</Link>
        </div>
      </form>
    </section>
  );
}
