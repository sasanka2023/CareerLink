import React from "react";
import { Bell, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CompanyHeaderProps {
  companyInfo: {
    name: string,
    logo: string,
    coverImage: string,
  };
}

function CompanyHeader({ companyInfo }: CompanyHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate("/company-login");
  };

  return (
    <div className="relative h-64 bg-gray-900">
      <img
        src={companyInfo.coverImage}
        alt="Company cover"
        className="w-full h-full object-cover opacity-50"
      />
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <Bell className="h-6 w-6" />
        </button>
        <button
          onClick={() => navigate("/company-settings")}
          className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <Settings className="h-6 w-6" />
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="max-w-7xl mx-auto flex items-end gap-6">
          <img
            src={companyInfo.logo}
            alt={companyInfo.name}
            className="w-32 h-32 rounded-lg border-4 border-white object-cover"
          />
          <div className="text-white mb-4">
            <h1 className="text-3xl font-bold">{companyInfo.name}</h1>
            <p className="text-gray-200">Connecting Talent with Opportunity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyHeader;
