import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2B2B2B] text-white px-8">
      <div className="flex w-full max-w-6xl items-center justify-between gap-16">
        {/* Logo */}
        <div className="flex-1 text-left">
          <h1 className="text-[#00BFFF] text-7xl md:text-8xl font-bold leading-tight">
            Mebalih
            <br />
            Film
          </h1>
        </div>

        {/* Section Login */}
        <div className="flex-1 max-w-lg">
          <div className="bg-[#2B2B2B] border-2 border-[#00BFFF] rounded-3xl p-10">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Login</h2>

            <form className="flex flex-col gap-5">
              {/* Email */}
              <input type="email" placeholder="E-mail" className="bg-transparent border-2 border-[#00BFFF] rounded-xl px-5 py-3 outline-none text-white placeholder-gray-400 focus:border-[#00CCFF] transition-colors" />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-transparent border-2 border-[#00BFFF] rounded-xl px-5 py-3 pr-12 outline-none w-full text-white placeholder-gray-400 focus:border-[#00CCFF] transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00BFFF] hover:text-[#00CCFF] transition-colors">
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>

              {/* CTA Register */}
              <div className="text-center">
                <span className="text-sm text-gray-400">Don't have an account? </span>
                <Link to="/register" className="text-sm text-[#00BFFF] font-medium hover:text-[#0099CC]">
                  Register now
                </Link>
              </div>

              {/* Button Login */}
              <Link to="/home" className="text-center bg-[#00BFFF] text-white py-3 rounded-xl mt-2 font-semibold text-lg hover:bg-[#00A8E1] block">
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
