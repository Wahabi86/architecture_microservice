import React, { useState, useEffect } from "react";
import { Edit, Eye, EyeOff } from "lucide-react";

function EditProfile() {
  // mengatur muncul dan tidaknya password
  const [showPassword, setShowPassword] = useState(false);

  // isi nama dan email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // mengatur input nama
  const [inputName, setInputName] = useState(name);

  // ambil data user dari localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setInputName(userData.name);
    }
  }, []);

  // mengatur tombol simpan untuk memperbarui nama
  const handleSubmit = (e) => {
    e.preventDefault();
    setName(inputName);
    alert("Profil Berhasil Disimpan");
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 w-full flex-1" style={{ minHeight: "calc(100vh - 120px)" }}>
      {/* Section Utama */}
      <div className="border border-[#00BFFF] rounded-2xl p-8 w-full max-w-4xl bg-[#333333] text-white">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Edit className="w-6 h-6 text-[#00BFFF]" />
          <h2 className="text-lg font-semibold">Edit Profile</h2>
        </div>

        {/* Form edit profile */}
        <div className="flex flex-row items-center justify-around gap-8">
          {/* Bagian foto */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-4xl font-bold text-black">{name.charAt(0).toUpperCase()}</div>
            <p className="mt-4 font-semibold">{name}</p>
          </div>

          {/* Bagian kanan: Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full md:w-1/2 bg">
            {/* Nama */}
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input type="text" name="name" value={inputName} onChange={(e) => setInputName(e.target.value)} className="w-full p-2  border border-[#00BFFF] rounded-md focus:outline-none" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input type="email" name="email" value={email} readOnly className="w-full p-2  border border-[#D9D9D9] rounded-md text-gray-400 cursor-not-allowed" />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-semibold mb-1">Change Password</label>
              <input type={showPassword ? "text" : "password"} name="password" className="w-full p-2 border border-[#00BFFF] rounded-md focus:outline-none pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[35px]   text-[#00BFFF]">
                {showPassword ? <Eye className="w-5 h-5 " /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>

            {/* Tombol Simpan */}
            <button type="submit" className="bg-[#00BFFF] hover:bg-[#00A4E4] text-white font-semibold py-2 px-4 rounded-md self-end">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
