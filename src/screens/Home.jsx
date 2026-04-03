import { useNavigate } from "react-router-dom";
import { ArrowRight, Activity } from "lucide-react";
import mainIcon from "../assets/icons/main_icon.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0148AF] via-blue-700 to-blue-900 flex items-center justify-center px-6">
      <div className="text-center max-w-xl">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-5 shadow-2xl">
            <img src={mainIcon} alt="Industrial MD" className="h-16 w-auto object-contain" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
          Welcome to{" "}
          <span className="text-blue-200">Industrial MD</span>
        </h1>

        {/* Subtext */}
        <p className="text-blue-200 text-base sm:text-lg mb-10 leading-relaxed">
          Your complete case management platform for industrial injury tracking,
          provider coordination, and workforce health oversight.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Cases Managed", value: "1,240+" },
            { label: "Providers",     value: "85+"    },
            { label: "Companies",     value: "320+"   },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl py-4 px-3">
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-blue-200 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/user-dashboard")}
          className="inline-flex items-center gap-2.5 bg-white text-[#0148AF] font-bold text-base px-8 py-3.5 rounded-2xl shadow-xl hover:bg-blue-50 hover:shadow-2xl transition-all duration-200 group"
        >
          <Activity className="w-5 h-5" />
          Go to Dashboard
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Footer note */}
        <p className="text-blue-300/60 text-xs mt-8">
          Industrial MD Case Management System © 2025
        </p>
      </div>
    </div>
  );
}