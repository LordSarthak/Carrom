import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Plus, Users, Gift, TrendingUp, Clock, Trophy, Target, Zap, Crown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';

export function Home() {
    const navigate = useNavigate();
    const { user, updateUser } = useAuthStore();
    const { totalMatches, wins } = useGameStore();
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [roomCode, setRoomCode] = useState('');

    // Calculate win rate
    const winRate = totalMatches > 0 ? ((wins / totalMatches) * 100).toFixed(1) : '0.0';

    const stats = [
        { label: 'Matches Played', value: totalMatches, icon: Gamepad2, color: '#00d9ff' },
        { label: 'Win Rate', value: `${winRate}%`, icon: Trophy, color: '#fbbf24' },
        { label: 'Level', value: user?.level || 1, icon: TrendingUp, color: '#00ff88' },
        { label: 'Total XP', value: user?.xp || 0, icon: Zap, color: '#a855f7' },
    ];

    const recentMatches = [
        { id: 1, opponent: 'Player123', result: 'won', score: '25-18', time: '2 hours ago' },
        { id: 2, opponent: 'ProGamer', result: 'lost', score: '15-25', time: '5 hours ago' },
        { id: 3, opponent: 'Champion99', result: 'won', score: '25-20', time: '1 day ago' },
    ];

    const onlinePlayers = [
        { id: 1, name: 'Alice', status: 'online' },
        { id: 2, name: 'Bob', status: 'online' },
        { id: 3, name: 'Charlie', status: 'in-game' },
        { id: 4, name: 'Diana', status: 'online' },
    ];

    const liveRooms = [
        { id: 1, name: 'Pro Room', players: '3/4', status: 'waiting' },
        { id: 2, name: 'Beginners Welcome', players: '2/4', status: 'waiting' },
        { id: 3, name: 'Tournament Finals', players: '4/4', status: 'in-game' },
    ];

    const handleCreateRoom = () => {
        navigate('/lobby');
    };

    const handleJoinRoom = () => {
        if (roomCode.trim()) {
            navigate('/lobby');
            setShowJoinModal(false);
        }
    };

    const handleQuickPlay = () => {
        navigate('/game');
    };

    const handleClaimReward = () => {
        if (user) {
            updateUser({ coins: user.coins + 500 });
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card neonGlow className="relative overflow-hidden">
                        {/* Animated Background */}
                        <div className="absolute inset-0 opacity-10">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-[#00d9ff] rounded-full"
                                    animate={{
                                        x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                                        y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                                        opacity: [0.2, 0.5, 0.2],
                                    }}
                                    transition={{
                                        duration: Math.random() * 10 + 10,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                />
                            ))}
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    Welcome back, {user?.username}!
                                </h1>
                                <p className="text-gray-400">Ready to dominate the carrom board?</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button onClick={handleQuickPlay} icon={<Gamepad2 size={20} />}>
                                    Quick Play
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={handleCreateRoom}
                                    icon={<Plus size={20} />}
                                >
                                    Create Room
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowJoinModal(true)}
                                    icon={<Users size={20} />}
                                >
                                    Join Room
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card hover className="h-full">
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div
                                        className="p-3 rounded-xl"
                                        style={{ backgroundColor: `${stat.color}20` }}
                                    >
                                        <stat.icon size={24} style={{ color: stat.color }} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                                        <p className="text-gray-400 text-sm">{stat.label}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* XP Progress Bar */}
                {user && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card>
                            <div className="flex items-center gap-4">
                                <Crown className="text-[#fbbf24]" size={32} />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white font-semibold">Level {user.level}</span>
                                        <span className="text-gray-400 text-sm">
                                            {user.xp} / {(user.level + 1) * 1000} XP
                                        </span>
                                    </div>
                                    <div className="w-full bg-[#1a1f35] rounded-full h-3 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${(user.xp / ((user.level + 1) * 1000)) * 100}%`,
                                            }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="bg-gradient-to-r from-[#00d9ff] to-[#00ff88] h-3 rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Matches */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card>
                            <h2 className="text-xl font-semibold text-white mb-4">Recent Matches</h2>
                            <div className="space-y-3">
                                {recentMatches.map((match) => (
                                    <motion.div
                                        key={match.id}
                                        whileHover={{ x: 4 }}
                                        className="glass p-4 rounded-lg border border-[#00d9ff]/20 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-full flex items-center justify-center">
                                                <span className="text-black font-bold text-sm">
                                                    {match.opponent.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{match.opponent}</p>
                                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                                    <Clock size={14} />
                                                    <span>{match.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span
                                                className={`text-sm font-semibold px-3 py-1 rounded-full ${match.result === 'won'
                                                        ? 'bg-[#00ff88]/20 text-[#00ff88]'
                                                        : 'bg-[#ff3366]/20 text-[#ff3366]'
                                                    }`}
                                            >
                                                {match.result === 'won' ? 'Won' : 'Lost'}
                                            </span>
                                            <p className="text-gray-400 text-sm mt-1">{match.score}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>

                        {/* Live Rooms */}
                        <Card>
                            <h2 className="text-xl font-semibold text-white mb-4">Live Rooms</h2>
                            <div className="space-y-3">
                                {liveRooms.map((room) => (
                                    <motion.div
                                        key={room.id}
                                        whileHover={{ x: 4 }}
                                        className="glass p-4 rounded-lg border border-[#00d9ff]/20 flex items-center justify-between cursor-pointer"
                                    >
                                        <div>
                                            <p className="text-white font-medium">{room.name}</p>
                                            <p className="text-gray-400 text-sm">{room.players} players</p>
                                        </div>
                                        <span
                                            className={`text-xs font-semibold px-3 py-1 rounded-full ${room.status === 'waiting'
                                                    ? 'bg-[#00ff88]/20 text-[#00ff88]'
                                                    : 'bg-[#fbbf24]/20 text-[#fbbf24]'
                                                }`}
                                        >
                                            {room.status === 'waiting' ? 'Join Now' : 'In Game'}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Daily Reward */}
                        <Card neonGlow className="cursor-pointer" hover>
                            <div className="text-center">
                                <Gift className="w-12 h-12 mx-auto mb-3 text-[#fbbf24]" />
                                <h3 className="text-lg font-semibold text-white mb-2">Daily Reward</h3>
                                <p className="text-gray-400 text-sm mb-4">Claim your daily bonus!</p>
                                <Button fullWidth variant="secondary" onClick={handleClaimReward}>
                                    Claim 500 Coins
                                </Button>
                            </div>
                        </Card>

                        {/* Online Players */}
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4">Online Players</h3>
                            <div className="space-y-3">
                                {onlinePlayers.map((player) => (
                                    <div key={player.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <div className="w-8 h-8 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-full" />
                                                <div
                                                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0a0e1a] ${player.status === 'online'
                                                            ? 'bg-[#00ff88]'
                                                            : 'bg-[#fbbf24]'
                                                        }`}
                                                />
                                            </div>
                                            <span className="text-white text-sm">{player.name}</span>
                                        </div>
                                        <Button size="sm" variant="ghost">
                                            Invite
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Trending Players */}
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="text-[#00d9ff]" size={20} />
                                Trending
                            </h3>
                            <div className="space-y-3">
                                {[1, 2, 3].map((rank) => (
                                    <div key={rank} className="flex items-center gap-3">
                                        <div
                                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${rank === 1
                                                    ? 'bg-[#fbbf24] text-black'
                                                    : rank === 2
                                                        ? 'bg-[#c0c0c0] text-black'
                                                        : 'bg-[#cd7f32] text-black'
                                                }`}
                                        >
                                            {rank}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white text-sm">Player{rank}</p>
                                            <p className="text-gray-400 text-xs">{1000 - rank * 50} XP</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Join Room Modal */}
            <Modal
                isOpen={showJoinModal}
                onClose={() => setShowJoinModal(false)}
                title="Join Room"
            >
                <div className="space-y-4">
                    <Input
                        label="Room Code"
                        placeholder="Enter 6-digit room code"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        maxLength={6}
                    />
                    <Button fullWidth onClick={handleJoinRoom}>
                        Join Room
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
