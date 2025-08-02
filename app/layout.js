import "../styles/globals.css";
import Providers from "./providers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "SIMS PPOB - Dhaifullah Hilmy",
  description: "Aplikasi SIMS PPOB menggunakan Next.js dan Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body inmaintabuse="1">
        <Providers>
          {children}
          <ToastContainer position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
