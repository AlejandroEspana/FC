import React from "react";

interface SafeZoneProps {
  children: React.ReactNode;
  className?: string;
}

export const SafeZone: React.FC<SafeZoneProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`w-[1920px] h-[1080px] bg-[#0A0D18] text-[#F8FAFC] flex flex-col justify-between p-12 overflow-hidden relative select-none ${className}`}
    >
      {children}
    </div>
  );
};
