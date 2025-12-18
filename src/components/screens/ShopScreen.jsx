import React from 'react';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ShopScreen({ products }) {
    return (
        <div className="p-6 pt-12 pb-24 min-h-screen bg-white flex flex-col items-center justify-center text-center">
            {/* Search Bar Placeholder for visual consistency if needed, but going for clean look as per image */}

            {/* Character Image Circle */}
            <div className="w-48 h-48 bg-indigo-50 rounded-full flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-transparent opacity-50"></div>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                    alt="User Character"
                    className="w-32 h-32 object-contain relative z-10 grayscale hover:grayscale-0 transition-all duration-500"
                />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">Henüz ürün yüklenmedi</h2>
            <p className="text-gray-500 text-sm max-w-[250px] mx-auto mb-8">
                Ama bu sırada sizin için <span className="text-indigo-600 font-bold">özel öneriler</span> hazırlıyoruz.
            </p>

            <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full max-w-xs bg-indigo-600 text-white rounded-xl py-4 font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
                <Sparkles size={20} className="text-yellow-300" />
                Önerileri Keşfet (AI)
            </motion.button>

            {/* Floating AB Button Mockup from image */}
            <div className="fixed bottom-24 right-6">
                <button className="w-14 h-14 bg-indigo-600 rounded-full shadow-xl flex items-center justify-center text-white relative">
                    <Sparkles size={24} />
                    <span className="absolute top-0 right-0 w-3 h-3 bg-pink-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </div>
    );
}
