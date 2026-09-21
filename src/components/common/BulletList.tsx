import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BulletItemData } from "../../content/types";

export interface BulletListProps {
  items: BulletItemData[];
  delayBetweenItems?: number;
}

export const BulletList: React.FC<BulletListProps> = ({
  items,
  delayBetweenItems = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map((item, idx) => {
        const itemDelay = idx * delayBetweenItems;
        const spr = spring({
          frame: Math.max(0, frame - itemDelay),
          fps,
          config: { damping: 14, stiffness: 100 },
        });

        const opacity = interpolate(spr, [0, 1], [0, 1]);
        const translateX = interpolate(spr, [0, 1], [-20, 0]);

        return (
          <div
            key={idx}
            style={{
              opacity,
              transform: `translateX(${translateX}px)`,
              borderLeftColor: item.badgeColor || "#38BDF8",
            }}
            className="p-4 rounded-xl bg-[#121829]/85 border border-[#1E2942] border-l-4 shadow-lg flex flex-col gap-1 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white tracking-tight">{item.title}</h4>
              {item.badge && (
                <span
                  style={{
                    backgroundColor: `${item.badgeColor || "#38BDF8"}20`,
                    color: item.badgeColor || "#38BDF8",
                    borderColor: `${item.badgeColor || "#38BDF8"}40`,
                  }}
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border"
                >
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-[#CBD5E1] leading-relaxed font-sans">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
};
