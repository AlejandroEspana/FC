import React from "react";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../layout/SafeArea";

export interface SafeZoneProps {
  children: React.ReactNode;
  className?: string;
}

export const SafeZone: React.FC<SafeZoneProps> = ({ children, className = "" }) => {
  return (
    <div
      style={{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }}
      className={`bg-[#0A0D18] text-[#F8FAFC] flex flex-col justify-between p-12 overflow-hidden relative select-none ${className}`}
    >
      {children}
    </div>
  );
};
