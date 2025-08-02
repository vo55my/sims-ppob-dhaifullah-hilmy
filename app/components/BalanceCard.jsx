"use client";
import Image from "next/image";

export default function BalanceCard({ balance, isVisible, onToggle }) {
  return (
    <div className="relative w-full md:w-auto">
      <Image
        src="/Background Saldo.png"
        alt="Background Saldo"
        width={690}
        height={284}
        className="rounded-xl"
      />
      <div className="absolute inset-0 p-6 text-white flex flex-col justify-center">
        <p className="text-md">Saldo anda</p>
        <p className="text-3xl font-bold tracking-wider py-3">
          {isVisible ? `Rp ${balance.toLocaleString("id-ID")}` : "Rp •••••••"}
        </p>
        <p
          onClick={onToggle}
          className="text-sm mt-1 cursor-pointer hover:underline w-fit"
        >
          {isVisible ? "Sembunyikan Saldo" : "Lihat Saldo"}
        </p>
      </div>
    </div>
  );
}
