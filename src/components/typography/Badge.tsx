import React from "react";

export interface BadgeProps {
  text: string;
  color?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  color = "#38BDF8",
  className = "",
}) => {
  return (
    <span
      style={{
        backgroundColor: `${color}1A`,
        borderColor: `${color}50`,
        color,
      }}
      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border font-mono ${className}`}
    >
      {text}
    </span>
  );
};
