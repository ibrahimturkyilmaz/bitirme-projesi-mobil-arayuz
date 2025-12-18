import React from 'react';
import { motion } from 'framer-motion';
import { Bell, ArrowRight, Home, Search, Play, Zap } from 'lucide-react';

export default function HomeScreen({ user, onSimulateEnter, onSimulateInStore }) {
    if (!user) return <div className="p-6">Yükleniyor...</div>;

    const categories = [
        { id: 1, name: 'Yeni Gelenler', icon: <Zap size={20} className="text-orange-500" />, color: 'bg-orange-100' },
        { id: 2, name: 'İndirim', icon: <div className="w-5 h-5 border-2 border-cyan-500 rounded-sm" />, color: 'bg-cyan-100' },
        { id: 3, name: 'Kombinler', icon: <div className="w-5 h-5 bg-orange-400 rounded-full" />, color: 'bg-orange-100' },
        { id: 4, name: 'Live', icon: <Play size={20} className="text-indigo-600" />, color: 'bg-indigo-100' },
    ];

    return (
        <div className="p-6 pt-12 pb-24 space-y-6 bg-white min-h-screen">
            {/* Header */}
            <header className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm">Hoş geldin,</p>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {user.name} {user.lastname || 'Yılmaz'}
                    </h1>
                </div>
                <div className="relative">
                    <Bell size={24} className="text-gray-700" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
            </header>

            {/* AI Prediction Card */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                    <Zap size={16} className="text-orange-500 fill-orange-500" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">AI TAHMİNİ</span>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                        <img src="https://cdn-icons-png.flaticon.com/512/2829/2829824.png" className="w-10 h-10 object-contain opacity-80" alt="Product" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 leading-tight">Şampuanınız bitmek üzere mi?</h3>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            Son siparişinizin üzerinden 45 gün geçti. Tek tıkla yenileyin.
                        </p>
                    </div>
                    <button className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white shrink-0">
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-4 gap-2">
                {categories.map((cat) => (
                    <div key={cat.id} className="flex flex-col items-center gap-2">
                        <div className={`w-16 h-16 rounded-full ${cat.color} flex items-center justify-center border-4 border-white shadow-sm`}>
                            {cat.icon}
                        </div>
                        <span className="text-[10px] font-medium text-gray-600 text-center">{cat.name}</span>
                    </div>
                ))}
            </div>

            {/* Custom Scroll Indicator Detail */}
            <div className="flex items-center justify-between gap-4 px-4 mt-2">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-gray-500 border-b-[8px] border-b-transparent transform rotate-180 opacity-60"></div>
                <div className="h-4 bg-gray-400/50 rounded-full flex-1 max-w-[200px] mx-auto relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-1/2 bg-gray-500 rounded-full"></div>
                </div>
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-gray-500 border-b-[8px] border-b-transparent opacity-60"></div>
            </div>

            {/* Recommended Section */}
            <section>
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Sizin İçin Seçildi</h2>
                    <button className="text-xs text-indigo-600 font-semibold">Tümünü Gör</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Product Card 1 */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm relative">
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                            Yüksek İhtimal
                        </span>
                        <div className="aspect-square bg-orange-50 rounded-xl mb-3 flex items-center justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/2806/2806144.png" className="w-20 h-20 object-contain mix-blend-multiply" alt="Jacket" />
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">Vintage Deri Ce...</h4>
                        <p className="text-indigo-600 font-bold text-sm mt-1">4.500 ₺</p>
                    </div>

                    {/* Product Card 2 */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm relative">
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                            %20 İndirim
                        </span>
                        <div className="aspect-square bg-blue-50 rounded-xl mb-3 flex items-center justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/2589/2589993.png" className="w-20 h-20 object-contain mix-blend-multiply" alt="Shirt" />
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">Slim Fit Gömlek</h4>
                        <p className="text-indigo-600 font-bold text-sm mt-1">899 ₺</p>
                    </div>
                </div>
            </section>

            {/* Developer Simulation Tools */}
            <section className="mt-8 border-t border-gray-100 pt-6">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Geliştirici Paneli (Geofence)</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={onSimulateEnter}
                        className="px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-semibold hover:bg-indigo-100 transition-colors"
                    >
                        📍 Mağaza Yakını<br />Simüle Et
                    </button>
                    <button
                        onClick={onSimulateInStore}
                        className="px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition-colors"
                    >
                        🏪 Mağaza İçi<br />Simüle Et
                    </button>
                </div>
            </section>
        </div>
    );
}
