"use client";
import Image from "next/image";

export default function BannerCarousel({ banners }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Temukan Promo Menarik</h2>
      <div className="flex gap-7 overflow-x-auto py-2">
        {banners.map((banner, index) => (
          <Image
            key={index}
            src={banner.banner_image}
            alt={banner.banner_name}
            className="h-30 rounded"
            width={320}
            height={160}
          />
        ))}
      </div>
    </div>
  );
}
