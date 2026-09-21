import React from "react";
import { SafeZone } from "../components/layout/SafeZone";

export interface VideoCompositionProps {
  children: React.ReactNode;
}

export const VideoComposition: React.FC<VideoCompositionProps> = ({ children }) => {
  return <SafeZone>{children}</SafeZone>;
};
