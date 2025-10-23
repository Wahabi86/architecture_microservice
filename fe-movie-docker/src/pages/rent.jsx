import React, { useState, useEffect } from "react";
import { benefits, premiumPlans, payments } from "../data/allData";
import { CircleCheckBig, ChevronDown } from "lucide-react";
import { createSubscription } from "../service/subscriptionService";
import { getProfile } from "../service/authService";

function Rent() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState(null);
  // Untuk Transfer Bank
  const [selectedBank, setSelectedBank] = useState(null);
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const banks = ["BCA", "BNI", "Mandiri", "BRI"];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleRentalClick = async () => {
    if (!selectedPlan || !selectedPayment) {
      alert("Please select a plan and payment method first!");
      return;
    }

    setLoading(true);
    try {
      await createSubscription(selectedPlan.key);

      // Ambil ulang data profile dari backend setelah sukses
      const updatedProfile = await getProfile();
      setProfile(updatedProfile);

      // Tampilkan popup sukses
      setShowModal(true);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to create subscription.");
    } finally {
      setLoading(false);
    }
  };

  //  Pada Saat klik metode pembayaran
  const handlePaymentClick = (method) => {
    setSelectedPayment(method);

    // Jika memilih Transfer Bank, tampilkan dropdown
    if (method.name === "Transfer Bank") {
      setShowBankDropdown(true);
    } else {
      setShowBankDropdown(false);
      setSelectedBank(null);
    }
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setShowBankDropdown(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="text-white py-12 px-20 pt-28">
      {/* User Info*/}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-4xl font-bold text-black"> {profile?.name ? profile.name.charAt(0).toUpperCase() : "?"}</div>
        <div>
          <h2 className="text-2xl font-semibold mb-2 px-3">{profile?.name}</h2>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="border border-[#00BFFF] text-sm px-3 py-1 rounded-full font-medium">
              {profile?.subscription_type === "monthly" ? "Monthly" : profile?.subscription_type === "3months" ? "3 Months" : profile?.subscription_type === "yearly" ? "Yearly" : "Free User"}
            </span>
            <p className="text-gray-400 text-sm">
              {profile?.subscription_expired_at ? (
                <>
                  Your Premium is valid until{" "}
                  <span className="text-[#00BFFF] font-semibold">
                    {new Date(profile.subscription_expired_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </>
              ) : (
                "You are not subscribed yet."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Premium Benefits */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-6">Premium Benefits</h3>

        <div className="grid grid-cols-6 gap-8 text-center">
          {benefits.map((item, index) => (
            <div key={item.name || index} className="flex flex-col items-center justify-center">
              <img src={item.img} alt={item.name} className="w-10 h-10 object-contain mb-2" />
              <p className="text-sm">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Plans */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-6">Premium Plans</h3>
        <div className="grid grid-cols-3 gap-6">
          {premiumPlans.map((plan) => (
            <div
              key={plan.key}
              onClick={() => setSelectedPlan(plan)}
              className={`cursor-pointer border rounded-2xl p-6 transition duration-300 ${selectedPlan?.key === plan.key ? "border-[#00BFFF] bg-[#00BFFF]/20" : "border-[#333333] bg-[#333333] hover:bg-white/10"}`}
            >
              <h4 className="text-2xl font-bold mb-2">{plan.title}</h4>
              <p className="text-[#00BFFF] text-2xl font-extrabold mb-3">
                Rp {plan.price}.00
                <span className="text-sm text-gray-300 ml-1">{plan.period}</span>
              </p>
              <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                <li>Ad-free experience</li>
                <li>Exclusive content</li>
                <li>HD Streaming</li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-6">Select Payment Method</h3>
        <div className="grid grid-cols-4 gap-6">
          {payments.map((method) => (
            <div key={method.name} className="relative">
              <button
                onClick={() => handlePaymentClick(method)}
                className={`flex items-center justify-center gap-3 w-full rounded-2xl py-4 px-6 transition duration-300 cursor-pointer ${
                  selectedPayment?.name === method.name ? "bg-[#00BFFF]/20 border border-[#00BFFF]" : "bg-[#333333] hover:bg-white/10"
                }`}
              >
                <img src={method.img} alt={method.name} className="w-8 h-8" />
                <span className="font-semibold">{method.name}</span>
                {method.name === "Transfer Bank" && <ChevronDown size={20} className={`transition duration-300 ${showBankDropdown ? "rotate-180" : ""}`} />}
              </button>

              {/* Section Dropdown pada Transfer Bank */}
              {method.name === "Transfer Bank" && selectedPayment?.name === "Transfer Bank" && showBankDropdown && (
                <div className="absolute left-0 right-0 mt-2 bg-[#2a2a2a] border border-[#333333] rounded-xl shadow-lg z-10">
                  {banks.map((bank) => (
                    <button key={bank} onClick={() => handleBankSelect(bank)} className="block w-full text-left px-4 py-2 hover:bg-[#00BFFF]/20 transition duration-200">
                      {bank}
                    </button>
                  ))}
                </div>
              )}
              {/* Menampilkan bank yang dipilih */}
              {method.name === "Transfer Bank" && selectedBank && (
                <p className="mt-2 text-gray-300 text-center">
                  Selected Bank: <span className="text-[#00BFFF] font-semibold">{selectedBank}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tombol Rental Now */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handleRentalClick}
          disabled={!selectedPlan || !selectedPayment || loading}
          className={`px-16 py-4 rounded-full font-bold text-lg transition-all duration-300 ${selectedPlan && selectedPayment && !loading ? "bg-[#00BFFF] hover:bg-[#0095CC] text-white" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}
        >
          {loading ? "Processing..." : "Rent Now"}
        </button>
      </div>

      {/* Section Pop Up */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full relative border border-[#333333]">
            {/* Icons Success */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <CircleCheckBig size={64} className="text-[#00BFFF]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
              <p className="text-gray-300 mb-6">
                You’ve successfully activated your <span className="font-semibold text-white">{selectedPlan?.title}</span> subscription via <span className="font-semibold text-white">{selectedPayment?.name}</span>.
              </p>

              {/* Info Details */}
              <div className="bg-[#2a2a2a] rounded-lg p-4 w-full mb-6 text-left">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Plan:</span>
                  <span className="text-white font-semibold">{selectedPlan?.title}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Price:</span>
                  <span className="text-[#00BFFF] font-bold">Rp {selectedPlan?.price}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment:</span>
                  <span className="text-white font-semibold">
                    {selectedPayment?.name}
                    {selectedBank && ` (${selectedBank})`}
                  </span>
                </div>
              </div>

              <button onClick={closeModal} className="w-full bg-[#00BFFF] hover:bg-[#0095CC] text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rent;
