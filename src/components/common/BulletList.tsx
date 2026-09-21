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
              borderLeftColor: item.badgeColor || "#2563EB",
            }}
            className="p-4 rounded-xl bg-white border border-slate-200 border-l-4 shadow-sm flex flex-col gap-1"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900 tracking-tight">{item.title}</h4>
              {item.badge && (
                <span
                  style={{
                    backgroundColor: `${item.badgeColor || "#2563EB"}15`,
                    color: item.badgeColor || "#2563EB",
                    borderColor: `${item.badgeColor || "#2563EB"}40`,
                  }}
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border"
                >
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
};
