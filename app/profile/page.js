"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
export default function ProfilePage() {
  const { data: session, status } = useSession();
   const userImage = session?.user.image;
 const [userName,setUserName]= useState('');

 const [saving,setSaving]= useState(false);
 const [saved,setSaved]= useState(false);

 const [error,setError]= useState();
 
  const router = useRouter();

useEffect(() => {
  if (status === 'authenticated' && session?.user?.name) {
    setUserName(session.user.name);
  }
}, [status, session]);

  if (status === "loading") {
    return <div>LOADING...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  
   async function handleform2(ev) {
    ev.preventDefault();
    setError('');
    setSaved(false);
    setSaving(true);

    try {
      const res = await 
     
      fetch('/api/profile', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({name:userName }),
})
;

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSaved(true);
     
    } catch (err) {
      setError(err.message);
    }

    setSaving(false);
  }

 async function handleform1(ev) {
  ev.preventDefault();
  setError('');
  setSaved(false);
  setSaving(true);

  const file = ev.target.files?.[0];

  try {
    if (file) {
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const result = await res.json(); // this will throw if response is HTML
      if (!res.ok) {
        throw new Error(result.error || 'Failed to save file');
      }

      console.log(result);
      setSaved(true);
    } else {
      throw new Error('No file selected');
    }
  } catch (err) {
    setError(err.message);
  }

  setSaving(false);
}


  return (
    <div className="mt-8 h-178 flex flex-col items-center">
      <h1 className="text-center mb-4 text-4xl gradient-t">PROFILE</h1>
           {saved && (
 <div className="bg-green-600 text-green-100 text-xl text-center w-110 p-5 rounded-xl">Profile updated</div>
           )}
            {
            saving && (<span class="loader"></span>)
           }
      <div className="flex items-center max-w-lg mx-auto gap-4">
       <div>
  <div className="p-4 items-center flex flex-col rounded-md">
    <Image
      src={userImage}
      height={128}
      width={128}
      alt="avatar"
      className="rounded-md"
    />
   <label className="mt-4 cursor-pointer inline-block">
  <input type="file" className="hidden" onChange={handleform1}/>
  <span className="text-amber-50 text-xl border px-6 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition">
    EDIT
  </span>
</label>

  </div>
</div>



        <form className="grow" onSubmit={handleform2}>
          <input type="text" placeholder="Name" className="bg-gray-400 text-gray-900" value={userName} onChange={ev=>setUserName(ev.target.value)} />
          <input type="text" name="email" disabled={true} id="" value={session?.user.email} />
          <button type="submit">SAVE</button>
        </form>
      </div>
           
    </div>
  );
}
