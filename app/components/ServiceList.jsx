"use client";
import Image from "next/image";

export default function ServiceList({ services }) {
  return (
    <div className="flex gap-5 overflow-x-auto py-4">
      {services.map((service) => (
        <div
          key={service.service_code}
          className="flex flex-col items-center text-center gap-2 w-20 flex-shrink-0"
        >
          <Image
            src={service.service_icon}
            alt={service.service_name}
            className="h-12"
            width={48}
            height={48}
          />
          <p className="text-sm capitalize">
            {service.service_name.replace(/Pajak|berlangganan/gi, "").trim()}
          </p>
        </div>
      ))}
    </div>
  );
}
