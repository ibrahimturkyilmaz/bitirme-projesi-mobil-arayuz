import React from 'react';
import { Home, ShoppingBag, User } from 'lucide-react';
import { clsx } from 'clsx';

export default function BottomNav({ activeTab, setActiveTab }) {
    const tabs = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'shop', icon: ShoppingBag, label: 'Shop' },
        { id: 'profile', icon: User, label: 'Profile' }
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 pb-safe pt-2 px-6 shadow-lg z-50">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 w-16",
                                isActive ? "text-indigo-600 -translate-y-2 bg-indigo-50" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={clsx("text-xs font-medium mt-1 transition-opacity", isActive ? "opacity-100" : "opacity-0 hidden")}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
