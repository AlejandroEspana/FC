import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CheckCircle } from "lucide-react";

export interface BulletItem {
  title: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
}

interface BulletListProps {
  items: BulletItem[];
  delayBetweenItems?: number;
  className?: string;
}

export const BulletList: React.FC<BulletListProps> = ({
  items,
  delayBetweenItems = 15,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>
      {items.map((item, index) => {
        const itemFrame = Math.max(0, frame - index * delayBetweenItems);
        const spr = spring({
          frame: itemFrame,
          fps,
          config: { damping: 15, stiffness: 120 },
        });

        const opacity = interpolate(itemFrame, [0, 8], [0, 1], {
          extrapolateRight: "clamp",
        });
        const translateY = interpolate(spr, [0, 1], [20, 0]);

        return (
          <div
            key={index}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
            }}
            className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm"
          >
            <div className="p-1 rounded-full bg-blue-50 text-blue-600 shrink-0 mt-0.5 border border-blue-200">
              <CheckCircle className="w-5 h-5" />
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900">{item.title}</span>
                {item.badge && (
                  <span
                    style={{
                      backgroundColor: `${item.badgeColor || "#2563EB"}15`,
                      color: item.badgeColor || "#2563EB",
                      borderColor: `${item.badgeColor || "#2563EB"}40`,
                    }}
                    className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border font-semibold"
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-sm text-slate-600 leading-relaxed mt-1 font-sans">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
