"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import { FiAtSign } from "react-icons/fi";

const schema = yup.object().shape({
  first_name: yup.string().required("Nama depan wajib diisi"),
  last_name: yup.string().required("Nama belakang wajib diisi"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup
    .string()
    .min(8, "Password minimal 8 karakter")
    .required("Password wajib diisi"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const router = useRouter();

  const onSubmit = async (data) => {
    const { confirmPassword, ...payload } = data;
    try {
      await api.post("/registration", payload);
      toast.success("Registrasi berhasil, silakan login");
      router.push("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <div className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="flex items-center justify-center mb-4">
            <Image src="/Logo.png" alt="Logo" width={30} height={30} />
            <h1 className="text-2xl font-bold ml-2">SIMS PPOB</h1>
          </div>
          <h1 className="text-4xl font-bold py-5 mb-10">
            Lengkapi data untuk membuat akun
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="relative">
              <FiAtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("email")}
                placeholder="masukan email anda"
                className="w-full p-2 pl-9 border border-gray-400 rounded"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
            <div className="relative">
              <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("first_name")}
                placeholder="nama depan"
                className="w-full p-2 pl-9 border border-gray-400 rounded"
              />
              <p className="text-red-500 text-sm">
                {errors.first_name?.message}
              </p>
            </div>
            <div className="relative">
              <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("last_name")}
                placeholder="nama belakang"
                className="w-full p-2 pl-9 border border-gray-400 rounded"
              />
              <p className="text-red-500 text-sm">
                {errors.last_name?.message}
              </p>
            </div>
            <div className="relative">
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("password")}
                type="password"
                placeholder="buat password"
                className="w-full p-2 pl-9 border border-gray-400 rounded"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <div className="relative">
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="konfirmasi password"
                className="w-full p-2 pl-9 border border-gray-400 rounded"
              />
              <p className="text-red-500 text-sm">
                {errors.confirmPassword?.message}
              </p>
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 mt-6 rounded w-full"
            >
              Registrasi
            </button>
          </form>
          <p className="text-center mt-7">
            sudah punya akun? Login{" "}
            <Link href="/login" className="text-red-500 font-bold underline">
              di sini
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center bg-gray-100">
        <Image
          src="/Illustrasi Login.png"
          alt="Ilustrasi"
          width={900}
          height={900}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
