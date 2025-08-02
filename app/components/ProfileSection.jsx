"use client";
import Image from "next/image";

export default function ProfileSection({ profile }) {
  return (
    <div className="w-full md:w-auto">
      <Image
        src="/Profile Photo.png"
        alt="Profile Picture"
        width={70}
        height={70}
        className="rounded-full mb-4"
      />
      <h1 className="text-xl">Selamat datang,</h1>
      <p className="text-3xl font-bold mb-2">
        {profile.first_name || "-"} {profile.last_name || ""}
      </p>
    </div>
  );
}
