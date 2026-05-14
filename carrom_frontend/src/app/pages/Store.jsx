import { motion } from 'motion/react';
import { ShoppingBag, Coins, Lock } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

export function Store() {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState < 'boards' | 'strikers' | 'coins' > ('boards');

    const boards = [
        { id: 1, name: 'Classic Wood', price: 0, owned: true, color: '#8b4513' },
        { id: 2, name: 'Neon Blue', price: 2500, owned: false, color: '#00d9ff' },
        { id: 3, name: 'Cyber Purple', price: 5000, owned: false, color: '#a855f7' },
        { id: 4, name: 'Gold Rush', price: 10000, owned: false, color: '#fbbf24' },
    ];

    const strikers = [
        { id: 1, name: 'Basic Striker', price: 0, owned: true, color: '#ffffff' },
        { id: 2, name: 'Lightning Bolt', price: 1500, owned: false, color: '#00d9ff' },
        { id: 3, name: 'Fire Storm', price: 3000, owned: false, color: '#ff3366' },
        { id: 4, name: 'Emerald Pro', price: 7500, owned: false, color: '#00ff88' },
    ];

    const coinPacks = [
        { id: 1, amount: 1000, price: '$0.99', bonus: 0 },
        { id: 2, amount: 5000, price: '$4.99', bonus: 500 },
        { id: 3, amount: 15000, price: '$9.99', bonus: 2000 },
        { id: 4, amount: 50000, price: '$24.99', bonus: 10000 },
    ];

    const [activeTab, setActiveTab] = useState('boards');
    if (type === 'coins') {
        toast.info('Purchase system coming soon!');
        return;
    }

    if (item.owned) {
        toast.info('You already own this item!');
        return;
    }

    if ((user?.coins || 0) < item.price) {
        toast.error('Not enough coins!');
        return;
    }

    toast.success(`Purchased ${item.name}!`);
};

return (
    <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="text-center mb-6">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-[#00d9ff]" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#00ff88] bg-clip-text text-transparent mb-2">
                        Store
                    </h1>
                    <p className="text-gray-400">Customize your gaming experience</p>
                </div>

                <div className="flex justify-center gap-3 mb-6">
                    <Button
                        variant={activeTab === 'boards' ? 'primary' : 'ghost'}
                        onClick={() => setActiveTab('boards')}
                    >
                        Board Skins
                    </Button>
                    <Button
                        variant={activeTab === 'strikers' ? 'primary' : 'ghost'}
                        onClick={() => setActiveTab('strikers')}
                    >
                        Striker Skins
                    </Button>
                    <Button
                        variant={activeTab === 'coins' ? 'primary' : 'ghost'}
                        onClick={() => setActiveTab('coins')}
                    >
                        <Coins size={18} />
                        Coin Packs
                    </Button>
                </div>

                <Card className="inline-block">
                    <div className="flex items-center gap-2">
                        <Coins className="text-[#fbbf24]" size={20} />
                        <span className="text-white font-semibold">Your Balance:</span>
                        <span className="text-[#00d9ff] font-bold text-lg">
                            {user?.coins.toLocaleString()}
                        </span>
                    </div>
                </Card>
            </motion.div>

            {activeTab === 'boards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {boards.map((board, index) => (
                        <motion.div
                            key={board.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card hover neonGlow={board.owned}>
                                <div
                                    className="w-full h-32 rounded-lg mb-4 relative overflow-hidden"
                                    style={{ backgroundColor: board.color }}
                                >
                                    {board.owned && (
                                        <div className="absolute top-2 right-2 bg-[#00ff88] text-black px-2 py-1 rounded-full text-xs font-semibold">
                                            Owned
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-white font-semibold mb-2">{board.name}</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-[#fbbf24]">
                                        <Coins size={16} />
                                        <span className="font-semibold">
                                            {board.price === 0 ? 'Free' : board.price.toLocaleString()}
                                        </span>
                                    </div>
                                    {board.owned ? (
                                        <Button size="sm" variant="ghost" disabled>
                                            Equipped
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            onClick={() => handlePurchase(board, 'board')}
                                            icon={
                                                (user?.coins || 0) < board.price ? (
                                                    <Lock size={16} />
                                                ) : undefined
                                            }
                                        >
                                            {(user?.coins || 0) < board.price ? 'Locked' : 'Buy'}
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            {activeTab === 'strikers' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {strikers.map((striker, index) => (
                        <motion.div
                            key={striker.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card hover neonGlow={striker.owned}>
                                <div className="w-full h-32 rounded-lg mb-4 bg-[#1a1f35] flex items-center justify-center">
                                    <div
                                        className="w-16 h-16 rounded-full shadow-lg"
                                        style={{
                                            backgroundColor: striker.color,
                                            boxShadow: `0 0 30px ${striker.color}`,
                                        }}
                                    />
                                    {striker.owned && (
                                        <div className="absolute top-2 right-2 bg-[#00ff88] text-black px-2 py-1 rounded-full text-xs font-semibold">
                                            Owned
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-white font-semibold mb-2">{striker.name}</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-[#fbbf24]">
                                        <Coins size={16} />
                                        <span className="font-semibold">
                                            {striker.price === 0 ? 'Free' : striker.price.toLocaleString()}
                                        </span>
                                    </div>
                                    {striker.owned ? (
                                        <Button size="sm" variant="ghost" disabled>
                                            Equipped
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            onClick={() => handlePurchase(striker, 'striker')}
                                            icon={
                                                (user?.coins || 0) < striker.price ? (
                                                    <Lock size={16} />
                                                ) : undefined
                                            }
                                        >
                                            {(user?.coins || 0) < striker.price ? 'Locked' : 'Buy'}
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            {activeTab === 'coins' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coinPacks.map((pack, index) => (
                        <motion.div
                            key={pack.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card hover neonGlow>
                                <div className="text-center py-6">
                                    <Coins className="w-16 h-16 mx-auto mb-4 text-[#fbbf24]" />
                                    <div className="text-3xl font-bold text-white mb-2">
                                        {pack.amount.toLocaleString()}
                                    </div>
                                    {pack.bonus > 0 && (
                                        <div className="text-[#00ff88] text-sm mb-2">
                                            + {pack.bonus.toLocaleString()} Bonus
                                        </div>
                                    )}
                                    <div className="text-2xl font-bold text-[#00d9ff] mb-4">
                                        {pack.price}
                                    </div>
                                    <Button
                                        fullWidth
                                        onClick={() => handlePurchase(pack, 'coins')}
                                    >
                                        Purchase
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

