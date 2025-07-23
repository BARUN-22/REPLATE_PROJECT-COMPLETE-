"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login"); 
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-10 bg-green-100 rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name} 👋</h1>
        <p className="text-gray-700">Email: {user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
