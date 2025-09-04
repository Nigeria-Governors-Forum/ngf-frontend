"use client";

import { useState } from "react";
import LandingPage from "@repo/ui/landingPage";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Endpoints, httpClient } from "../api-client/src";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const image = "@repo/ui/images/logo.png";

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  async function fetchData() {
    try {
      const stats = await httpClient.get(Endpoints.auth.login);
      console.log(stats);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async action
    fetchData();
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
      toast.success(`Welcome, ${username}!`);
    }, 1500);
  };

  return (
    <>
      <Toaster position="top-right" />
      <LandingPage
        text="Nigeria Governors' Forum Health Dashboard"
        username={username}
        password={password}
        onUsernameChange={handleUsernameChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleSubmit}
        loading={loading}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        usernameLabel="Username"
        passwordLabel="Passcode"
        submitLabel="Sign In"
        copyRight={true}
      />
    </>
  );
}
