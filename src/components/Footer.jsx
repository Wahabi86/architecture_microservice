import React from "react";
import { Copyright } from "lucide-react";


function Footer() {
  return (
    <footer className="footer">
      <p className="flex items-center justify-center gap-2 text-sm">
        <Copyright className="w-5 h-5 text-[#00BFFF]" />
        2025 Hipertensi. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
