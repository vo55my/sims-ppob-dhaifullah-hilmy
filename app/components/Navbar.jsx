"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white text-black mb-4 py-4 px-30 border-b border-gray-300">
      <div className="flex items-center gap-2">
        <Image src="/Logo.png" alt="SIMS PPOB Logo" width={20} height={20} />
        <span className="text-lg font-bold">SIMS PPOB</span>
      </div>
      <div className="flex gap-6 md:gap-12 lg:gap-16">
        <Link href="/top-up" className="hover:underline font-semibold">Top Up</Link>
        <Link href="/transaction" className="hover:underline font-semibold">Transaction</Link>
        <Link href="/account" className="hover:underline font-semibold">Akun</Link>
      </div>
    </nav>
  );
}
