import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Mengatur scroll agar selalu ke atas setiap kali route berubah
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // tidak menampilkan apapun
}
