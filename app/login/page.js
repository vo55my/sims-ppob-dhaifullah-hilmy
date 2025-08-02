"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { AiOutlineLock } from "react-icons/ai";
import { FiAtSign } from "react-icons/fi";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: yup.string().required("Password wajib diisi"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/login", data);
      const { token } = response.data.data;
      localStorage.setItem("token", token);
      dispatch(setToken(token));
      toast.success("Login berhasil");
      router.push("/home");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login gagal");
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
            Masuk atau buat akun untuk memulai
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
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("password")}
                type="password"
                placeholder="masukan password anda"
                className="w-full p-2 pl-9 border border-gray-400 rounded"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 mt-6 rounded w-full"
            >
              Masuk
            </button>
          </form>
          <p className="text-center mt-7">
            belum punya akun? registrasi{" "}
            <Link href="/register" className="text-red-500 font-bold underline">
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
