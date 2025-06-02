"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [userHouse, setUserHouse] = useState('');
const [userPincode, setUserPincode] = useState('');
const [userCity, setUserCity] = useState('');
const [userCountry, setUserCountry] = useState('');
  const [userDob, setUserDob] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const [admin, setAdmin] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUserProfile() {
      if (status === 'authenticated') {
        try {
          const res = await fetch('/api/profile');
          const user = await res.json();

          setUserName(user.name || '');
          setUserHouse(user.house || '');
setUserPincode(user.pincode || '');
setUserCity(user.city || '');
setUserCountry(user.country || '');
setAdmin(user.admin|| '');
          setUserDob(user.dob ? new Date(user.dob).toISOString().split('T')[0] : '');
          setUserPhone(user.phone || '');
          setImageUrl(user.image || '');
        } catch (err) {
          console.error('Failed to load user profile:', err);
        }
      }
    }

    fetchUserProfile();
  }, [status]);

  if (status === "loading") return <div>LOADING...</div>;
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  function handleImageSelect(ev) {
    const file = ev.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  }

  async function handleSave(ev) {
    ev.preventDefault();
    setError('');
    setSaved(false);
    setSaving(true);

    try {
      let finalImageUrl = imageUrl;

      // Upload image first (if selected)
      if (selectedImage) {
        const formData = new FormData();
        formData.append('file', selectedImage);

        const uploadRes = await fetch('/api/profile', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadData.error || 'Image upload failed');
        }

        finalImageUrl = uploadData.image;
      }

      // Update profile details
      const profileRes = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
  name: userName,
  house: userHouse,
  pincode: userPincode,
  city: userCity,
  country: userCountry,
  dob: userDob,
  phone: userPhone,
  image: finalImageUrl,
}),
      });

      const profileData = await profileRes.json();
      if (!profileRes.ok) {
        throw new Error(profileData.error || 'Something went wrong');
      }

      setSaved(true);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }

    setSaving(false);
  }

  return (
    <div className="mt-8 flex flex-col items-center">
      <h1 className="text-center mb-4 text-4xl gradient-t">PROFILE</h1>

      {saved && (
        <div className="bg-green-600 text-green-100 text-xl text-center w-110 p-5 rounded-xl">
          Profile updated
        </div>
      )}
      {saving && <span className="loader"></span>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="flex flex-col items-center mx-auto gap-4 w-full">
        <div className="flex items-center gap-20 rounded-xl w-400 m-2 p-5 bg-gray-950">
          {/* Profile Image */}
          <div className="relative rounded-full w-40 h-40 overflow-hidden border-gray-700">
            <Image
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : imageUrl || 'https://via.placeholder.com/150'
              }
              alt="avatar"
              fill
              className="object-cover"
            />
            <label className="absolute bottom-2 right-2 bg-gray-900 text-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-gray-700 transition">
              <input type="file" className="hidden" onChange={handleImageSelect} />
              <span role="img" aria-label="camera" className="text-xl">📷</span>
            </label>
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-amber-200">{userName || "Your Name"}</h2>
             <p className="text-lg text-white">
  {[userHouse, userCity, userCountry, userPincode].filter(Boolean).join(', ') || "Your Address"}
</p>
          </div>
        </div>

        {/* Personal Info Form */}
        <div className="mb-4 bg-gray-950 rounded-xl w-400 p-5">
          <div className="flex justify-around items-center">
            <h2 className="text-2xl font-semibold text-amber-200 ml-5">Personal Information</h2>
            <button
              className="bg-amber-200 text-black px-5 py-1 rounded-xl"
              onClick={() => setEditing(true)}
            >
              EDIT
            </button>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-3 text-white mt-4">
            {editing ? (
            <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-md bg-gray-950">

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-white p-4">
    <div className="flex flex-col sm:col-span-2">
      <label className="text-sm mb-1 text-gray-300">Name</label>
      <input
        type="text"
        placeholder="Your Name"
        className="input-field"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
    </div>

    <div className="flex flex-col sm:col-span-2">
      <label className="text-sm mb-1 text-gray-300">Phone</label>
      <input
        type="text"
        placeholder="Phone Number"
        className="input-field"
        value={userPhone}
        onChange={(e) => setUserPhone(e.target.value)}
      />
    </div>

    <div className="flex flex-col sm:col-span-2">
      <label className="text-sm mb-1 text-gray-300">House Name / Street</label>
      <input
        type="text"
        placeholder="House Name / Street"
        className="input-field"
        value={userHouse}
        onChange={(e) => setUserHouse(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm mb-1 text-gray-300">Pincode</label>
      <input
        type="text"
        placeholder="Pincode"
        className="input-field"
        value={userPincode}
        onChange={(e) => setUserPincode(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm mb-1 text-gray-300">City</label>
      <input
        type="text"
        placeholder="City"
        className="input-field"
        value={userCity}
        onChange={(e) => setUserCity(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm mb-1 text-gray-300">Country</label>
      <input
        type="text"
        placeholder="Country"
        className="input-field"
        value={userCountry}
        onChange={(e) => setUserCountry(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm mb-1 text-gray-300">Date of Birth</label>
      <input
        type="date"
        className="input-field"
        value={userDob}
        onChange={(e) => setUserDob(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm mb-1 text-gray-300">Email</label>
      <input
        type="text"
        name="email"
        disabled
        className="input-field bg-gray-100 cursor-not-allowed text-gray-600"
        value={session?.user.email}
      />
    </div>
  </div>

  <div className="mt-6 text-right">
    <button
      onClick={handleSave}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
    >
      SAVE
    </button>
  </div>
</div>


            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white p-6 rounded-xl shadow-lg">
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="text-lg font-medium text-amber-100">{userName || '—'}</p>
                </div>
             
<div>
  <p className="text-sm text-gray-400">Address</p>
  <p className="text-lg font-medium text-amber-100">
    {[userHouse, userCity, userCountry,userPincode].filter(Boolean).join(', ') || '—'}
  </p>
</div>

                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-lg font-medium text-amber-100">{userPhone || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date of Birth</p>
                  <p className="text-lg font-medium text-amber-100">
                    {userDob ? new Date(userDob).toLocaleDateString() : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-lg font-medium text-amber-100">{session?.user.email || '—'}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
