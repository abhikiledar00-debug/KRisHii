import React from "react";
import { Home, Package, Bell, User } from 'lucide-react';

interface BottomNavProps {
  active: 'home' | 'orders' | 'notifications' | 'profile';
  onNavigate: (tab: 'home' | 'orders' | 'notifications' | 'profile') => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'orders' as const, icon: Package, label: 'Orders' },
    { id: 'notifications' as const, icon: Bell, label: 'Alerts' },
    { id: 'profile' as const, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 pb-safe z-40">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
                isActive
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Icon className={`size-6 ${isActive ? 'fill-green-100' : ''}`} />
              <span className="text-xs">{tab.label}</span>
              {tab.id === 'notifications' && (
                <div className="absolute top-1 right-1 size-2 bg-red-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
