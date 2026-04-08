"use client";

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Box,
  Cpu,
  FileText,
  Globe,
  Layers,
  Languages,
  ListFilter,
  LogOut,
  Menu,
  Moon,
  PanelLeftOpen,
  RefreshCw,
  Rocket,
  Search,
  Server,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Sun,
  SunMoon,
  User,
  X,
  XCircle,
  XOctagon,
  Circle,
} from "lucide-react";

export type SFSymbolName =
  | "waveform.path.ecg"
  | "square.stack.3d.up"
  | "doc.text"
  | "gearshape"
  | "paperplane"
  | "shippingbox"
  | "server.rack"
  | "slider.horizontal.3"
  | "globe"
  | "sun.max"
  | "moon"
  | "sun.max.and.moon"
  | "rectangle.portrait.and.arrow.right"
  | "line.3.horizontal"
  | "sidebar.left"
  | "xmark"
  | "xmark.circle"
  | "xmark.octagon"
  | "person"
  | "sparkles"
  | "arrow.clockwise"
  | "magnifyingglass"
  | "line.3.horizontal.decrease.circle"
  | "cpu"
  | "list.bullet"
  | "character.bubble"
  | "switch.2";

const iconMap: Record<SFSymbolName, LucideIcon> = {
  "waveform.path.ecg": Activity,
  "square.stack.3d.up": Layers,
  "doc.text": FileText,
  "gearshape": Settings2,
  "paperplane": Rocket,
  "shippingbox": Box,
  "server.rack": Server,
  "slider.horizontal.3": SlidersHorizontal,
  "globe": Globe,
  "sun.max": Sun,
  "moon": Moon,
  "sun.max.and.moon": SunMoon,
  "rectangle.portrait.and.arrow.right": LogOut,
  "line.3.horizontal": Menu,
  "sidebar.left": PanelLeftOpen,
  "xmark": X,
  "xmark.circle": XCircle,
  "xmark.octagon": XOctagon,
  "person": User,
  "sparkles": Sparkles,
  "arrow.clockwise": RefreshCw,
  "magnifyingglass": Search,
  "line.3.horizontal.decrease.circle": ListFilter,
  "cpu": Cpu,
  "list.bullet": Layers,
  "character.bubble": Languages,
  "switch.2": SlidersHorizontal,
};

interface SFSymbolProps {
  name: SFSymbolName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function SFSymbol({
  name,
  size = 18,
  className,
  strokeWidth = 1.9,
}: SFSymbolProps) {
  const Icon = iconMap[name] || Circle;
  return <Icon size={size} className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
