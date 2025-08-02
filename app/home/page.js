"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import ProfileSection from "../components/ProfileSection";
import BalanceCard from "../components/BalanceCard";
import ServiceList from "../components/ServiceList";
import BannerCarousel from "../components/BannerCarousel";

export default function HomePage() {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    profile_image: "",
  });
  const [balance, setBalance] = useState(0);
  const [services, setServices] = useState([]);
  const [banners, setBanners] = useState([]);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await api.get("/profile");
        const balanceRes = await api.get("/balance");
        const servicesRes = await api.get("/services");
        const bannerRes = await api.get("/banner");

        setProfile(profileRes.data.data);
        setBalance(balanceRes.data.data.balance);
        setServices(servicesRes.data.data);
        setBanners(bannerRes.data.data);
      } catch (err) {
        toast.error("Gagal mengambil data");
        console.error("Gagal mengambil data:", err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <Navbar />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-8 gap-6 px-30">
        <ProfileSection profile={profile} />
        <BalanceCard
          balance={balance}
          isVisible={isBalanceVisible}
          onToggle={() => setIsBalanceVisible(!isBalanceVisible)}
        />
      </div>

      <div className="px-25">
        <ServiceList services={services} />
      </div>

      <div className="px-30">
        <BannerCarousel banners={banners} />
      </div>
    </div>
  );
}
