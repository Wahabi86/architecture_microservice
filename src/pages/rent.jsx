import React from "react";
import { benefits, premiumPlans, payments } from "../data/allData";

function Rent() {
  return (
    <div className="min-h-screen text-white py-12 px-20 pt-28">
      {/* User Info*/}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-4xl font-bold text-black">W</div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Wahyu Gantenk</h2>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="border border-[#00BFFF] text-sm px-3 py-1 rounded-full font-medium">Annual Plan</span>
            <p className="text-gray-400 text-sm">Your Premium is valid Nov 20, 2025.</p>
          </div>
        </div>
      </div>

      {/* Premium Benefits */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-6">Premium Benefits</h3>

        <div className="grid grid-cols-6 gap-8 text-center">
          {benefits.map((item) => (
            <div key={item} className="flex flex-col items-center justify-center">
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
            <div key={plan} className="border border-[#333333] bg-[#333333] rounded-2xl p-6 hover:bg-white/20 hover:border-[#00BFFF]  transition duration-300">
              <h4 className="text-2xl font-bold mb-2">{plan.title}</h4>
              <p className="text-[#00BFFF] text-2xl font-extrabold mb-3">
                Rp {plan.price}.00
                <span className="text-sm text-gray-300 ml-1">{plan.period}</span>
              </p>
              <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                {plan.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Select Payment Method</h3>
        <div className="grid grid-cols-4 gap-6">
          {payments.map((method) => (
            <button key={method} className="flex items-center justify-center gap-3 bg-[#333333] hover:bg-white/20 rounded-2xl py-4 px-6 transition duration-300">
              <img src={method.img} alt={method.name} className="w-8 h-8" />
              <span className="font-semibold">{method.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rent;
