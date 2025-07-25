"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    alert("Logged out successfully.");
    router.push("/");
  }, [router]);

  return null;
};

export default LogoutPage;
