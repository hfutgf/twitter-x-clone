import { LucideIcon } from "lucide-react";
import React from "react";

interface ISidebarItem {
  item: { path: string; label: string; icon: LucideIcon };
}

export default function SidebarItem({ item }: ISidebarItem) {
  return (
    <div className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
        <item.icon size={28} color="white" />
      </div>

      <div className="relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
        <item.icon size={24} color="white" />
        <p className="hidden lg:block text-xl text-white">{item.label}</p>
      </div>
    </div>
  );
}
